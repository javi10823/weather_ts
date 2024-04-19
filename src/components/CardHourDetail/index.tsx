import {WeatherIcon, kelvinToCelsius} from '../../utils';
import {Container} from '../Container';
import {Typography} from '../Typography';
import {NextThreeHours} from '../../types';

interface Props {
  forecast: NextThreeHours;
}

export const CardHourDetail = ({forecast}: Props) => (
  <Container flex={0.25} height={'80%'} justifyContent={'space-around'}>
    <Typography fontSize={14}>
      {kelvinToCelsius(forecast.main.temp)}°C
    </Typography>
    <WeatherIcon weatherData={forecast.weather[0].main} />
    <Typography fontSize={14}>
      {new Date(forecast.dt * 1000).toLocaleTimeString([], {
        hour: '2-digit',
      })}
    </Typography>
  </Container>
);
