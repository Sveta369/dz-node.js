import chalk from 'chalk';
import dedent from 'dedent-js';
import { WeatherData } from './api.service.js';


const printError = (error: string): void => {
	console.log(chalk.bgRed(' ERROR ') + ' ' + error);
};

const printSuccess = (message: string): void => {
	console.log(chalk.bgGreen(' SUCCESS ') + ' ' + message);
};

const printHelp = (): void => {
	console.log(
		dedent`${chalk.bgCyan(' HELP ')}
		Без параметров - вывод погоды
		-s [CITY] для установки города
		-h для вывода помощи
		-t [API_KEY] для сохранения токена
		`
	);
};

type Translations = {
  [key: string]: {
    weather: string;
    inCity: string;
    temperature: string;
    feelsLike: string;
    humidity: string;
    windSpeed: string;
  };
};  

const printWeather = (res: WeatherData, icon: string, lang: string): void => {
	const translations: Translations = {
        ru: {
            weather: 'ПОГОДА',
            inCity: 'Погода в городе',
            temperature: 'Температура',
            feelsLike: 'ощущается как',
            humidity: 'Влажность',
            windSpeed: 'Скорость ветра'
        },
        en: {
            weather: 'WEATHER',
            inCity: 'Weather in the city',
            temperature: 'Temperature',
            feelsLike: 'feels like',
            humidity: 'Humidity',
            windSpeed: 'Wind speed'
        }
    };
	const t = translations[lang] || translations.en;
	console.log(
		dedent`${chalk.bgYellow(` ${t.weather} `)} ${t.inCity} ${res.name}
        ${icon}  ${res.weather[0].description}
        ${t.temperature}: ${res.main.temp}°C (${t.feelsLike} ${res.main.feels_like}°C)
        ${t.humidity}: ${res.main.humidity}%
        ${t.windSpeed}: ${res.wind.speed} м/с
		`
	);
};

export { printError, printSuccess, printHelp, printWeather };