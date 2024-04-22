import React, {useEffect, useMemo, useState} from 'react';
import {ActivityIndicator, ScrollView, View} from 'react-native';
import {getWeatherCordInfo, getWeatherInfo} from '../../redux/weather/thunks';
import {styles} from './styled';
import {Input, Typography} from '../../components';
import {getNextThreeDaysForecast, getNextThreeHourForecast} from '../../utils';
import {NextThreeDays, NextThreeHours} from '../../types';
import Geolocation from '@react-native-community/geolocation';
import {requestLocationPermission} from '../../utils';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import Toast from 'react-native-toast-message';
import MainWeatherInfo from '../../components/MainWeatherInfo';
import ForecastSection from '../../components/ForecastSection';

export const Home = () => {
  const dispatch = useAppDispatch();
  const {weatherData, forecastData, loading, error} = useAppSelector(
    state => state.weather,
  );
  const [nextThreeHours, setNextThreeHours] = useState<NextThreeHours[]>([]);
  const [nextThreeDays, setNextThreeDays] = useState<NextThreeDays[]>([]);
  const [city, setCity] = useState('');

  const handleSubmit = () => {
    const trimmedCity = city.replace(/\s+/g, '');
    dispatch(getWeatherInfo({city: trimmedCity}));
  };

  const formattedDate = useMemo(
    () =>
      new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      }),
    [],
  );

  const renderContent = useMemo(() => {
    if (loading) return <ActivityIndicator size="large" color="white" />;

    return (
      <>
        <View style={styles.header}>
          <Input
            placeholder="Search your City."
            value={city}
            onChangeText={setCity}
            onSubmit={handleSubmit}
          />
        </View>

        <View style={styles.section}>
          {weatherData ? (
            <>
              <MainWeatherInfo weatherData={weatherData} />

              <ForecastSection
                formattedDate={formattedDate}
                nextThreeDays={nextThreeDays}
                nextThreeHours={nextThreeHours}
                weatherData={weatherData}
              />
            </>
          ) : (
            <Typography>No Data available</Typography>
          )}
        </View>
      </>
    );
  }, [loading, city, weatherData, nextThreeHours]);

  useEffect(() => {
    requestLocationPermission().then(() => {
      Geolocation.getCurrentPosition(info => {
        dispatch(
          getWeatherCordInfo({
            lat: info.coords.latitude,
            lon: info.coords.longitude,
          }),
        );
      });
    });
  }, []);

  useEffect(() => {
    if (forecastData) {
      setNextThreeHours(getNextThreeHourForecast(forecastData));
      setNextThreeDays(getNextThreeDaysForecast(forecastData));
    }
  }, [forecastData]);

  useEffect(() => {
    if (error)
      Toast.show({
        type: 'error',
        text1: 'City not found',
        text2: 'The requested city was not found.',
      });
  }, [error]);

  return (
    <ScrollView
      style={styles.scrollContainer}
      contentContainerStyle={styles.scrollContentContainer}>
      {renderContent}
    </ScrollView>
  );
};
