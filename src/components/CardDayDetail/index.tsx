import {WeatherIcon, kelvinToCelsius} from '../../utils';
import {Container} from '../Container';
import {Typography} from '../Typography';

interface Props {
  date: string;
  minTemp: number;
  maxTemp: number;
  conditions: string;
}

export const CardDayDetail = ({date, minTemp, maxTemp, conditions}: Props) => (
  <Container
    flex={1}
    flexDirection={'row'}
    justifyContent={'space-between'}
    marginBottom={10}>
    <Typography fontSize={14}>{date}</Typography>
    <WeatherIcon weatherData={conditions} />
    <Container flex={0.4} flexDirection="row" justifyContent="space-between">
      <Typography fontSize={14}>{kelvinToCelsius(maxTemp)}°C</Typography>
      <Typography fontSize={14}>{kelvinToCelsius(minTemp)}°C</Typography>
    </Container>
  </Container>
);
