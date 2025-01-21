#!/usr/bin/env node
import { getArgs } from './helpers/args.js';
import { getWeather, getIcon } from './services/api.service.js';
import { printHelp, printSuccess, printError, printWeather } from './services/log.service.js';
import { saveKeyValue, TOKEN_DICTIONARY, getKeyValue } from './services/storage.service.js';

const saveToken = async (token: string): Promise<void> => {
	if (!token.length) {
		printError('Не передан token');
		return;
	}
	try {
		await saveKeyValue(TOKEN_DICTIONARY.token, token);
		printSuccess('Токен сохранён');
	} catch (e) {
		printError((e as Error).message);
	}
}

const saveCity = async (city: string): Promise<void> => {
	if (!city.length) {
		printError('Не передан город');
		return;
	}
	try {
		await saveKeyValue(TOKEN_DICTIONARY.city, city);
		printSuccess('Город сохранён');
	} catch (e) {
		printError((e as Error).message);
	}
}

const saveLanguage = async (lang: string): Promise<void> => {
	if (!lang.length) {
		printError('Не передан язык');
		return;
	}
	try {
		await saveKeyValue(TOKEN_DICTIONARY.lang, lang);
		printSuccess(`Язык изменён на ${lang}`);
	} catch (e) {
		printError((e as Error).message);
	}
};

const getForcast = async (): Promise<void> => {
	let lang: string = 'en';
	try {
		const city = process.env.CITY ?? await getKeyValue(TOKEN_DICTIONARY.city);
		if (!city) {
			printError('Не указан город');
            return;
		}; 	
		lang = await getKeyValue(TOKEN_DICTIONARY.lang) || 'en';
		const citiesArray = city.split(',');
		const weather = await getWeather(citiesArray, lang);
	    weather.forEach(weather => {
			printWeather(weather, getIcon(weather.weather[0].icon), lang)
	});
	} catch (e) {
		if ((e as any)?.response?.status == 404) {
			printError(lang === 'ru' ? 'Неверно указан город' : 'City not found');
		} else if ((e as any)?.response?.status == 401) {
			printError(lang === 'ru' ? 'Неверно указан токен' : 'Invalid API token');
		} else {
			printError((e as Error).message);
		}
	}
};

const initCLI = async (): Promise<void> => {
	const args = getArgs(process.argv);
	if (args.h) {
		return printHelp();
	}
	if (args.s) {
		await saveCity(args.s as string);
		return;
	}
	if (args.t) {
		await saveToken (args.t as string);
		return;
	}
	if (args.l) {
		await saveLanguage(args.l as string);
		return;
	}
	await getForcast();
};

initCLI();