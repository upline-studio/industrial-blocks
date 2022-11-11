<template>
	<l-map style="height: 80vh" :zoom="zoom" :center="center" ref="mapRef">
		<l-tile-layer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />
		<l-geo-json v-if="isShowMap" :geojson="geojson" :options="geojsonOptions" />
	</l-map>
</template>
<script>
import { LMap, LTileLayer, LGeoJson } from "@vue-leaflet/vue-leaflet";
import { onMounted, ref, watch, computed } from "vue";
import { fetchGeoserverData } from "@/scripts/fetchGeoserverData";

export default {
	components: { LMap, LTileLayer, LGeoJson },
	setup() {
		const mapRef = ref(null);
		const geojson = ref(null);
		const isShowMap = ref(false);
		watch(mapRef, () => { });
		const geojsonOptions = computed(() => ({
			style(feature) {
				const total = feature.properties.percent_total;
				const red = (total / 70) * 255;
				const green = 255 - red;
				const color = `rgba(${red},${green},0,0.7)`;
				return {
					color,
				};
			},
			onEachFeature(feature, layer) {
				layer.bindPopup(
					`total points: ${feature.properties.percent_total}`
				);
			}
		}))
		onMounted(async () => {
			geojson.value = await fetchGeoserverData()
			isShowMap.value = true
		})
		return {
			zoom: 11,
			center: [55.8, 37.6],
			geojson,
			geojsonOptions,
			isShowMap
		};
	},
};
</script>
