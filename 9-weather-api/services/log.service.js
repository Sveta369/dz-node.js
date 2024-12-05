import chalk from 'chalk';
import dedent from 'dedent-js';

const printError = (error) => {
	console.log(chalk.bgRed(' ERROR ') + ' ' + error);
};

const printSuccess = (message) => {
	console.log(chalk.bgGreen(' SUCCESS ') + ' ' + message);
};

const printHelp = () => {
	console.log(
		dedent`${chalk.bgCyan(' HELP ')}
		Без параметров - вывод погоды
		-s [CITY] для установки города
		-h для вывода помощи
		-t [API_KEY] для сохранения токена
		`
	);
};

const printWeather = (res, icon, lang) => {
	const translations = {
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