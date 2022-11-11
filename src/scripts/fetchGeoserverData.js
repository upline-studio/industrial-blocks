import axios from 'axios';
import { layouts } from './data'

const URL = 'http://37.18.110.72:8080/geoserver/moscow/wms?service=WMS&version=1.1.0&request=GetMap'

export async function fetchGeoserverData() {
	const result = []
	try {
		for (const layout of layouts) {
			const { name, bbox } = layout
			const resp = await axios({
				method: 'get',
				url: `${URL}&layers=${name}&bbox=${bbox}&width=768&height=330&srs=EPSG%3A4326&styles=&format=geojson`,
			});
			layout.geojson = resp.data
			result.push(layout);
		}
		return result
	} catch (e) {
		return e.response;
	}
}
