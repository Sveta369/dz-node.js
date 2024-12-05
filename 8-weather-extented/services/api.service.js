import axios from 'axios';
import https from 'https';
import { getKeyValue, TOKEN_DICTIONARY } from './storage.service.js';

const getIcon = (icon) => {
	switch (icon.slice(0, -1)) {
		case '01':
			return '☀️';
		case '02':
			return '🌤️';
		case '03':
			return '☁️';
		case '04':
			return '☁️';
		case '09':
			return '🌧️';
		case '10':
			return '🌦️';
		case '11':
			return '🌩️';
		case '13':
			return '❄️';
		case '50':
			return '🌫️';
	}
};

const getWeather = async (city, lang = 'ru') => {
	const token = process.env.TOKEN ?? await getKeyValue(TOKEN_DICTIONARY.token);
	if (!token) {
		throw new Error('Не задан ключ API, задайте его через команду -t [APY_KEY]');
	}
	const weatherData = [];
	for (const c of city) {
	const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
		params: {
			q: c,
			appid: token,
			lang: lang,
			units: 'metric'
		}
	});	
	weatherData.push(data);
}
	return weatherData;
};

export { getWeather, getIcon };

