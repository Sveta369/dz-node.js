import { homedir } from 'os';
import { join } from 'path';
import { promises } from 'fs';

const filePath = join(homedir(), 'weather-data.json');

const TOKEN_DICTIONARY = {
	token: 'token',
	city: 'city',
	lang: 'lang'
}

const saveKeyValue = async (key: string, value: string): Promise<void> => {
	let data: Record<string, string> = {};
	if (await isExist(filePath)) {
		const file = await promises.readFile(filePath, 'utf-8');
		data = JSON.parse(file);
	}
	data[key] = value;
	await promises.writeFile(filePath, JSON.stringify(data));
};

const getKeyValue = async (key: string): Promise<string | undefined> => {
	if (await isExist(filePath)) {
		const file = await promises.readFile(filePath, 'utf-8');
		const data = JSON.parse(file);
		return data[key];
	}
	return undefined;
};

const isExist = async (path: string): Promise<boolean> => {
	try {
		await promises.stat(path);
		return true;
	} catch (e) {
		return false;
	}
}

export { saveKeyValue, getKeyValue, TOKEN_DICTIONARY };