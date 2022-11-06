<template>
  <l-map style="height: 50vh" :zoom="zoom" :center="center" ref="mapRef">
    <l-tile-layer
      url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
    ></l-tile-layer>
    <l-tile-layer
      url="http://localhost:8080/geoserver/ows?service=wms"
      :options="{
        layers: 'forest2000',
        format: 'image/png',
        transparent: true,
        opacity: 0.7,
      }"
    ></l-tile-layer>
  </l-map>
</template>
<script>
import L from "leaflet";
import { LMap, LTileLayer } from "@vue-leaflet/vue-leaflet";
import { ref, watch } from "vue";

export default {
  components: { LMap, LTileLayer },
  setup() {
    const mapRef = ref(null);
    watch(mapRef, () => {});
    return {
      zoom: 11,
      center: [55.8, 37.6],
    };
  },
};
</script>
