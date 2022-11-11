export const layouts = [
	// {
	// 	id: 'Земельные_участки',
	// 	property: 'descr',
	// 	color: '#450000',
	// 	name:
	// 		'moscow%3A%D0%97%D0%B5%D0%BC%D0%B5%D0%BB%D1%8C%D0%BD%D1%8B%D0%B5_%D1%83%D1%87%D0%B0%D1%81%D1%82%D0%BA%D0%B8',
	// 	bbox: '7.334346771240234%2C55.75446701049805%2C37.83428955078125%2C55.957977294921875',
	// 	isEnabled: false,
	// 	options: {
	// 		style() {
	// 			return {
	// 				color: 'red',
	// 			};
	// 		},
	// 		onEachFeature(feature, layer) {
	// 			layer.bindPopup(
	// 				`Адрес: ${feature.properties.address}`
	// 			);
	// 		}
	// 	},
	// 	geojson: null
	// },
	// {
	// 	id: 'ОКС',
	// 	name: 'moscow%3A%D0%9E%D0%9A%D0%A1',
	// 	isEnabled: false,
	// 	bbox: '37.337013244628906%2C55.755287170410156%2C37.735923767089844%2C55.95624923706055',
	// 	options: {
	// 		style() {
	// 			return {
	// 				color: 'black',
	// 			};
	// 		},
	// 		onEachFeature(feature, layer) {
	// 			layer.bindPopup(
	// 				`Адрес: ${feature.properties.address}`
	// 			);
	// 		},
	// 	},
	// 	geojson: null
	// },
	// {
	// 	id: 'Организации_СВАО_САО',
	// 	type: 'point',
	// 	name:
	// 		'moscow%3A%D0%9E%D1%80%D0%B3%D0%B0%D0%BD%D0%B8%D0%B7%D0%B0%D1%86%D0%B8%D0%B8_%D0%A1%D0%92%D0%90%D0%9E_%D0%A1%D0%90%D0%9E',
	// 	isEnabled: true,
	// 	bbox: '37.37728500366211%2C55.7609748840332%2C37.73512268066406%2C55.951751708984375',
	// 	options: {
	// 		style() {
	// 			return {
	// 				color: 'grey',
	// 			};
	// 		},
	// 		onEachFeature(feature, layer) {
	// 			layer.bindPopup(
	// 				`Количество мест: ${feature.properties.kol_mest}`
	// 			);
	// 		},

	// 	},
	// 	geojson: null
	// },
	// {
	// 	id: 'СЗЗ',
	// 	name: 'moscow%3A%D0%A1%D0%97%D0%97',
	// 	bbox: '37.33365249633789%2C55.75892639160156%2C37.71660614013672%2C55.958702087402344',
	// 	isEnabled: true,
	// 	options: {
	// 		style() {
	// 			return {
	// 				color: 'yellow',
	// 			};
	// 		},
	// 		onEachFeature(feature, layer) {
	// 			layer.bindPopup(
	// 				`vid_zouit: ${feature.properties.vid_zouit}`
	// 			);
	// 		},
	// 	},
	// 	geojson: null
	// },
	// {
	// 	id: 'Стартовые_площадки_реновации.',
	// 	name:
	// 		'moscow%3A%D0%A1%D1%82%D0%B0%D1%80%D1%82%D0%BE%D0%B2%D1%8B%D0%B5_%D0%BF%D0%BB%D0%BE%D1%89%D0%B0%D0%B4%D0%BA%D0%B8_%D1%80%D0%B5%D0%BD%D0%BE%D0%B2%D0%B0%D1%86%D0%B8%D0%B8',
	// 	isEnabled: false,
	// 	bbox: '37.479888916015625%2C55.793357849121094%2C37.719974517822266%2C55.94343948364258',
	// 	options: {
	// 		style() {
	// 			return {
	// 				color: 'orange',
	// 			};
	// 		},
	// 		onEachFeature(feature, layer) {
	// 			layer.bindPopup(
	// 				`Район: ${feature.properties.rayon}`
	// 			);
	// 		},
	// 	},
	// 	geojson: null
	// },
	// {
	// 	id: 'Территории_объектов_культурного_н',
	// 	name:
	// 		'moscow%3A%D0%A2%D0%B5%D1%80%D1%80%D0%B8%D1%82%D0%BE%D1%80%D0%B8%D0%B8_%D0%BE%D0%B1%D1%8A%D0%B5%D0%BA%D1%82%D0%BE%D0%B2_%D0%BA%D1%83%D0%BB%D1%8C%D1%82%D1%83%D1%80%D0%BD%D0%BE%D0%B3%D0%BE_%D0%BD',
	// 	isEnabled: false,
	// 	bbox: '37.45478057861328%2C55.76094436645508%2C37.704627990722656%2C55.944602966308594',
	// 	options: {
	// 		style() {
	// 			return {
	// 				color: '#0ff77f',
	// 			};
	// 		},
	// 		onEachFeature(feature, layer) {
	// 			layer.bindPopup(
	// 				`Название: ${feature.properties.name}`
	// 			);
	// 		},
	// 	},
	// 	geojson: null
	// },
	{
		id: 'land',
		name: 'moscow%3Aland',
		isEnabled: false,
		bbox: '37.334346771240234%2C55.75446701049805%2C37.83428955078125%2C55.957977294921875',
		options: {
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
		},
		geojson: null
	},
];
