<template>
	<div class="industrial-blocks">
		<l-map class="industrial-blocks__map" style="height: 80vh" :zoom="zoom" :center="center" ref="mapRef"
			@ready="leafletMapApi()">
			<l-tile-layer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />
			<l-geo-json v-if="efficientLayoutData" :visible="efficientLayoutData.isEnabled" :geojson="efficientGeojson"
				:options="efficientLayoutData.options" />
			<l-geo-json v-if="sanitaryLayoutData" :visible="sanitaryLayoutData.isEnabled"
				:geojson="sanitaryLayoutData.geojson" :options="sanitaryLayoutData.options" />
			<l-geo-json v-if="cultureLayoutData" :visible="cultureLayoutData.isEnabled" :geojson="cultureLayoutData.geojson"
				:options="cultureLayoutData.options" />
		</l-map>
		<div class="industrial-blocks__info">
			<h1>Выберите слой</h1>
			<ol v-if="isFetched" class="industrial-blocks__list">
				<li v-if="efficientLayoutData" class="industrial-blocks__item">
					<label class="industrial-blocks__label">
						<input v-model="efficientLayoutData.isEnabled" type="checkbox">
						<span>{{ efficientLayoutData.title }}</span>
					</label>
				</li>
				<li v-if="sanitaryLayoutData" class="industrial-blocks__item">
					<label class="industrial-blocks__label">
						<input v-model="sanitaryLayoutData.isEnabled" type="checkbox">
						<span>{{ sanitaryLayoutData.title }}</span>
					</label>
				</li>
				<li v-if="cultureLayoutData" class="industrial-blocks__item">
					<label class="industrial-blocks__label">
						<input v-model="cultureLayoutData.isEnabled" type="checkbox">
						<span>{{ cultureLayoutData.title }}</span>
					</label>
				</li>
			</ol>
			<div v-else>Загрузка ...</div>
			<div v-if="efficientLayoutProperties">
				<h2>Свойства выделенной области</h2>
				<ol class="industrial-blocks__properties">
					<li v-for="property in efficientLayoutProperties" :key="property.kadastr">
						<ul>
							<li><b>Кадастровый номер: {{ property.kadastr }}</b></li>
							<li>Общий критерий не эффективности: {{ property.percent_total }}</li>
							<li>Жилое, из них: {{ property.percent_living }}</li>
							<li>Права и обременения, из них: {{ property.percent_rights }}</li>
							<li>Количество рабочих мест, из них: {{ property.percent_workplaces }}</li>
							<li>Земельный участок, из них: {{ property.percent_zu }}</li>
						</ul>
					</li>
				</ol>
			</div>
		</div>
	</div>
</template>
<script>
import { LMap, LTileLayer, LGeoJson, LControl } from "@vue-leaflet/vue-leaflet";
import { onMounted, ref, watch, computed } from "vue";
import { fetchGeoserverData } from "@/scripts/fetchGeoserverData";
import { DrawAreaSelection } from '@bopen/leaflet-area-selection';
import * as turf from '@turf/turf'

export default {
	components: { LMap, LTileLayer, LGeoJson, LControl },
	setup() {
		const mapRef = ref(null);
		const map = ref(null)
		const layoutsData = ref(null);
		const efficientLayoutData = ref(null)
		const sanitaryLayoutData = ref(null)
		const cultureLayoutData = ref(null)
		const isFetched = ref(false);
		const selectedAreaGeojson = ref(null);

		const areaSelection = new DrawAreaSelection({
			onPolygonReady: (polygon) => {
				selectedAreaGeojson.value = polygon.toGeoJSON(3);
			},
			onButtonDeactivate: (polygon) => {
				selectedAreaGeojson.value = polygon ? polygon.toGeoJSON(3) : null
			}
		});
		const leafletMapApi = () => {
			map.value = mapRef.value.leafletObject
		}
		watch(map, () => {
			map.value.addControl(areaSelection)
		})
		const efficientGeojson = computed(() => {
			if (selectedAreaGeojson.value) {
				return {
					...efficientLayoutData.value.geojson,
					features: efficientLayoutData.value.geojson.features.filter(feature => turf.booleanIntersects(feature, selectedAreaGeojson.value))
				}
			}
			return efficientLayoutData.value.geojson
		})
		const efficientLayoutProperties = computed(() => {
			if (selectedAreaGeojson.value) {
				return efficientGeojson.value.features.map(feature => feature.properties)
			}
			return null
		})
		watch(layoutsData, () => {
			layoutsData.value.forEach(layout => {
				if (layout.id === 'land') {
					efficientLayoutData.value = layout
				} else if (layout.id === 'СЗЗ') {
					sanitaryLayoutData.value = layout
				} else if (layout.id === 'Территории_объектов_культурного_н') {
					cultureLayoutData.value = layout
				}
			})
		})
		onMounted(async () => {
			const layoutsGeoJSON = await fetchGeoserverData()
			if (layoutsGeoJSON) {
				layoutsData.value = layoutsGeoJSON
				isFetched.value = true;
			}
		})

		return {
			zoom: 11,
			center: [55.8, 37.6],
			mapRef,
			leafletMapApi,
			isFetched,
			efficientLayoutData,
			efficientGeojson,
			sanitaryLayoutData,
			cultureLayoutData,
			efficientLayoutProperties
		};
	},
};
</script>
<style lang="scss">
.industrial-blocks {
	display: grid;
	gap: 20px;
	grid-template-columns: 3fr 1fr;

	&__list {
		display: flex;
		gap: 20px;
		flex-direction: column;
		margin: 0;
		padding: 0;
		list-style-type: none;
		font-size: 20px;
	}

	&__item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px
	}

	&__label {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		cursor: pointer;

		&:hover {
			opacity: .8;
		}
	}

	&__properties {
		overflow-y: auto;
		display: flex;
		flex-direction: column;
		gap: 16px;
		max-height: 330px;
	}
}
</style>
