import axios from 'axios';
import { getKeyValue, TOKEN_DICTIONARY } from './storage.service.js';

export type WeatherData = {
  name: string;
  weather: { description: string; icon: string }[];
  main: { temp: number; feels_like: number; humidity: number };
  wind: { speed: number };
};

const getIcon = (icon: string): string => {
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
		default:
            return '❓';
	}
};

const getWeather = async (city: string[], lang = 'ru'): Promise<WeatherData[]> => {
	const token = process.env.TOKEN ?? await getKeyValue(TOKEN_DICTIONARY.token);
	if (!token) {
		throw new Error('Не задан ключ API, задайте его через команду -t [APY_KEY]');
	}
	const weatherData: WeatherData[] = [];
	for (const c of city) {
	const { data } = await axios.get<WeatherData>('https://api.openweathermap.org/data/2.5/weather', {
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

