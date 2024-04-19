import React from 'react';
import CloudSvg from '../../../assets/svgs/CloudSvg';
import DropSvg from '../../../assets/svgs/DropSvg';
import RainSvg from '../../../assets/svgs/RainSvg';
import SnowSvg from '../../../assets/svgs/SnowSvg';
import SunSvg from '../../../assets/svgs/SunSvg';
import {ForecastData, NextThreeDays, WeatherData} from '../../types';

export const kelvinToCelsius = (kelvin: number) => {
  return Math.round(kelvin - 273.15);
};

export const getTemperatureInCelsius = (
  weatherData: WeatherData,
  key: keyof typeof weatherData.main,
) => {
  return weatherData && weatherData.main && weatherData.main[key]
    ? kelvinToCelsius(weatherData.main[key])
    : 'Loading...';
};

export const getNextThreeHourForecast = (forecastData: ForecastData) => {
  return forecastData.list.slice(0, 4);
};

export const getNextThreeDaysForecast = (forecastData: ForecastData) => {
  const dailyData: Record<string, NextThreeDays> = {};
  forecastData.list.forEach(item => {
    const date = new Date(item.dt * 1000).toDateString();
    if (!dailyData[date]) {
      dailyData[date] = {
        date,
        minTemp: item.main.temp_min,
        maxTemp: item.main.temp_max,
        conditions: item.weather[0].main,
        icon: item.weather[0].icon,
      };
    } else {
      dailyData[date].minTemp = Math.min(
        dailyData[date].minTemp,
        item.main.temp_min,
      );
      dailyData[date].maxTemp = Math.max(
        dailyData[date].maxTemp,
        item.main.temp_max,
      );
    }
  });

  return Object.entries(dailyData)
    .map(([, data]) => data)
    .slice(0, 3);
};

const selectWeatherIcon = (weatherCondition: string) => {
  switch (weatherCondition) {
    case 'Clear':
      return <SunSvg />;
    case 'Clouds':
      return <CloudSvg />;
    case 'Rain':
      return <DropSvg />;
    case 'Snow':
      return <SnowSvg />;
    case 'Thunderstorm':
      return <RainSvg />;
    default:
      return <CloudSvg />;
  }
};

export const WeatherIcon = ({weatherData}: {weatherData: string}) => {
  return selectWeatherIcon(weatherData);
};
