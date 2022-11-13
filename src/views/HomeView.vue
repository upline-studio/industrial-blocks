<template>
	<div class="industrial-blocks">
		<l-map class="industrial-blocks__map" style="height: 80vh" :zoom="zoom" :center="center" ref="mapRef"
			@ready="leafletMapApi()">
			<l-tile-layer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />
			<template v-for="layout in layoutsData" :key="layout.id">
				<l-geo-json :visible="layout.isEnabled" :geojson="layout.geojson" :options="layout.options" />
			</template>
		</l-map>
		<div class="industrial-blocks__info">
			<ol v-if="isFetched">
				<li v-for="layout in layoutsData" :key="layout.id + '_info'">
					<label>
						<span>{{ layout.id }}</span>
						<input v-model="layout.isEnabled" type="checkbox">
					</label>
					{{ layout.isReady }}
				</li>
			</ol>
			<div v-else>Загрузка ...</div>
		</div>
	</div>
</template>
<script>
import { L } from 'leaflet';
import { LMap, LTileLayer, LGeoJson, LControl } from "@vue-leaflet/vue-leaflet";
import { onMounted, ref, watch } from "vue";
import { fetchGeoserverData } from "@/scripts/fetchGeoserverData";
import { DrawAreaSelection } from '@bopen/leaflet-area-selection';

export default {
	components: { LMap, LTileLayer, LGeoJson, LControl },
	setup() {
		const mapRef = ref(null);
		const map = ref(null)
		const layoutsData = ref(null);
		const showLandLayout = ref(false);
		const selectedAreaGeoJSON = ref(null);
		const isFetched = ref(false);

		const areaSelection = new DrawAreaSelection({
			fadeOnActivation: true,
			onPolygonReady: (polygon) => {
				selectedAreaGeoJSON.value = polygon.toGeoJSON(3);
			}
		});
		const leafletMapApi = () => {
			map.value = mapRef.value.leafletObject
		}
		watch(map, () => {
			map.value.addControl(areaSelection)
		})
		watch(selectedAreaGeoJSON, () => {
			// получать данные геосервера в пределах выделеннной области
			console.log(selectedAreaGeoJSON.value)
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
			layoutsData,
			showLandLayout,
			mapRef,
			leafletMapApi,
			isFetched
		};
	},
};
</script>
<style>
.industrial-blocks {
	display: grid;
	gap: 20px;
	grid-template-columns: 3fr 1fr;
}
</style>
