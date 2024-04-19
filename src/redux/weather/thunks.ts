import {createAsyncThunk} from '@reduxjs/toolkit';
import {
  fetchForecastCordData,
  fetchForecastData,
  fetchWeatherCordData,
  fetchWeatherData,
} from '../../services/weather';
import {ForecastData, WeatherData} from '../../types';
import {AxiosError} from 'axios';

interface CityParams {
  city: string;
}

interface CoordinatesParams {
  lat: number;
  lon: number;
}

interface WeatherApiResponse {
  weather: WeatherData;
  forecast: ForecastData;
}

interface ApiError {
  message: string;
  code: number;
}

export const getWeatherInfo = createAsyncThunk<
  WeatherApiResponse,
  CityParams,
  {rejectValue: ApiError}
>('weather/getWeatherInfo', async ({city}: CityParams, {rejectWithValue}) => {
  try {
    const weatherResponse = await fetchWeatherData(city);
    const forecastResponse = await fetchForecastData(city);

    return {
      weather: weatherResponse?.data,
      forecast: forecastResponse?.data,
    };
  } catch (error) {
    return rejectWithValue({
      message: (error as AxiosError)?.message || 'Unknown error',
      code: parseInt((error as AxiosError).code || '500', 10),
    });
  }
});

export const getWeatherCordInfo = createAsyncThunk<
  WeatherApiResponse,
  CoordinatesParams,
  {rejectValue: ApiError}
>(
  'weather/getWeatherCordInfo',
  async (params: CoordinatesParams, {rejectWithValue}) => {
    try {
      const weatherResponse = await fetchWeatherCordData(
        params.lat,
        params.lon,
      );
      const forecastResponse = await fetchForecastCordData(
        params.lat,
        params.lon,
      );
      return {
        weather: weatherResponse?.data,
        forecast: forecastResponse?.data,
      };
    } catch (error) {
      return rejectWithValue({
        message: (error as AxiosError)?.message || 'Unknown error',
        code: parseInt((error as AxiosError).code || '500', 10),
      });
    }
  },
);
