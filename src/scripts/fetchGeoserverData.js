import axios from "axios";

export async function fetchGeoserverData() {
  try {
    const resp = await axios({
      method: "get",
      url: `http://37.18.110.72:8080/geoserver/moscow/wms?service=WMS&version=1.1.0&request=GetMap&layers=moscow%3Aland&bbox=37.334346771240234%2C55.75446701049805%2C37.83428955078125%2C55.957977294921875&width=768&height=330&srs=EPSG%3A4326&styles=&format=geojson`,
    });
    return resp.data;
  } catch (e) {
    return e.response;
  }
}
