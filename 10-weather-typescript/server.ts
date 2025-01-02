import express, { Request, Response } from 'express';
import { getWeather, getIcon } from './services/api.service.js';
import { getKeyValue, saveKeyValue, TOKEN_DICTIONARY } from './services/storage.service.js';

const app = express();
const port = 8000;

app.use(express.json());

app.get('/weather', async (req: Request, res: Response): Promise<void> => {
  try {
    const city = req.query.city as string || (await getKeyValue(TOKEN_DICTIONARY.city));
    const lang = req.query.lang as string || (await getKeyValue(TOKEN_DICTIONARY.lang)) || 'en';
    if (!city) {
      res.status(400).json({ error: 'City is required' });
      return;
    }

    const citiesArray = city.split(',');
    const weatherData = await getWeather(citiesArray, lang);

    const response = weatherData.map((weather) => ({
      city: weather.name,
      description: weather.weather[0].description,
      temperature: weather.main.temp,
      feels_like: weather.main.feels_like,
      humidity: weather.main.humidity,
      wind_speed: weather.wind.speed,
      icon: getIcon(weather.weather[0].icon),
    }));

    res.json(response);
  } catch (error: any) {
    if (error?.response?.status === 404) {
      res.status(404).json({ error: 'City not found' });
    } else if (error?.response?.status === 401) {
      res.status(401).json({ error: 'Invalid API token' });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

app.post('/settings/city', async (req: Request, res: Response): Promise<void> => {
  const { city } = req.body;
  if (!city) {
    res.status(400).json({ error: 'City is required' });
    return;
  }
  try {
    await saveKeyValue(TOKEN_DICTIONARY.city, city);
    res.json({ message: 'City saved', city });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
