#!/usr/bin/env node
import { getArgs } from './helpers/args.js';
import { getWeather, getIcon } from './services/api.service.js';
import { printHelp, printSuccess, printError, printWeather } from './services/log.service.js';
import { saveKeyValue, TOKEN_DICTIONARY, getKeyValue } from './services/storage.service.js';

const saveToken = async (token) => {
	if (!token.length) {
		printError('Не передан token');
		return;
	}
	try {
		await saveKeyValue(TOKEN_DICTIONARY.token, token);
		printSuccess('Токен сохранён');
	} catch (e) {
		printError(e.message);
	}
}

const saveCity = async (city) => {
	if (!city.length) {
		printError('Не передан город');
		return;
	}
	try {
		await saveKeyValue(TOKEN_DICTIONARY.city, city);
		printSuccess('Город сохранён');
	} catch (e) {
		printError(e.message);
	}
}

const saveLanguage = async (lang) => {
	if (!lang.length) {
		printError('Не передан язык');
		return;
	}
	try {
		await saveKeyValue(TOKEN_DICTIONARY.lang, lang);
		printSuccess(`Язык изменён на ${lang}`);
	} catch (e) {
		printError(e.message);
	}
};

const getForcast = async () => {
	try {
		const city = process.env.CITY ?? await getKeyValue(TOKEN_DICTIONARY.city); 	
		const lang = await getKeyValue(TOKEN_DICTIONARY.lang) || 'en';
		const citiesArray = city.split(',');
		const weather = await getWeather(citiesArray, lang);
	    weather.forEach(weather => {
			printWeather(weather, getIcon(weather.weather[0].icon), lang)
	});
	} catch (e) {
		if (e?.response?.status == 404) {
			printError(lang === 'ru' ? 'Неверно указан город' : 'City not found');
		} else if (e?.response?.status == 401) {
			printError(lang === 'ru' ? 'Неверно указан токен' : 'Invalid API token');
		} else {
			printError(e.message);
		}
	}
};

const initCLI = () => {
	const args = getArgs(process.argv);
	if (args.h) {
		return printHelp();
	}
	if (args.s) {
		return saveCity(args.s);
	}
	if (args.t) {
		return saveToken (args.t);
	}
	if (args.l) {
		return saveLanguage(args.l);
	}
	return getForcast();
};

initCLI();