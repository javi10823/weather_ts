import {Container, Image, Typography} from '..';
import {WeatherData} from '../../types';
import {getTemperatureInCelsius} from '../../utils';

interface Props {
  weatherData: WeatherData;
}

const MainWeatherInfo = ({weatherData}: Props) => (
  <Container flex={1} marginBottom={30}>
    <Image
      width={150}
      height={150}
      source={require('../../../assets/images/sun.png')}
      resizeMode="cover"
    />
    <Typography fontSize={64} fontWeight={600} color={'#fff'}>
      {getTemperatureInCelsius(weatherData, 'temp')}°C
    </Typography>
    <Typography fontSize={32} fontWeight={400} color={'#fff'}>
      {weatherData && weatherData.name && weatherData.name}
    </Typography>
    <Typography fontSize={14} fontWeight={300} color={'#fff'}>
      Precipitations
    </Typography>
    <Typography fontSize={14} fontWeight={400} color={'#fff'}>
      Max.: {getTemperatureInCelsius(weatherData, 'temp_max')}°C | Min.:{' '}
      {getTemperatureInCelsius(weatherData, 'temp_min')}°C
    </Typography>
  </Container>
);

export default MainWeatherInfo;
