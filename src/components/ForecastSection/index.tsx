import {View} from 'react-native';
import {CardDayDetail, CardHourDetail, Container, Typography} from '..';
import {NextThreeDays, NextThreeHours, WeatherData} from '../../types';
import {getTemperatureInCelsius} from '../../utils';
import {styles} from '../../pages/Home/styled';
import CalendarSvg from '../../../assets/svgs/CalendarSvg';
import WindSvg from '../../../assets/svgs/WindSvg';
import ThermometerSvg from '../../../assets/svgs/ThermometerSvg';
import DropSvg from '../../../assets/svgs/DropSvg';

interface Props {
  weatherData: WeatherData;
  formattedDate: string;
  nextThreeHours: NextThreeHours[];
  nextThreeDays: NextThreeDays[];
}

const ForecastSection = ({
  weatherData,
  nextThreeDays,
  nextThreeHours,
  formattedDate,
}: Props) => (
  <Container flex={0.5} justifyContent="center">
    <View style={styles.viewToday}>
      <Container width={'33%'} flexDirection={'row'}>
        <ThermometerSvg />
        <Typography fontSize={14} fontWeight={400} color={'#fff'}>
          {getTemperatureInCelsius(weatherData, 'feels_like')}
          °C
        </Typography>
      </Container>

      <Container width={'33%'} flexDirection={'row'}>
        <DropSvg />
        <Typography fontSize={14} fontWeight={400} color={'#fff'}>
          {weatherData?.main?.humidity}%
        </Typography>
      </Container>

      <Container width={'33%'} flexDirection={'row'}>
        <WindSvg />
        <Typography fontSize={14} fontWeight={400} color={'#fff'}>
          {weatherData?.main && `${Math.round(weatherData.wind.speed)} km/h`}
        </Typography>
      </Container>
    </View>

    <View style={styles.detailToday}>
      <View style={styles.topDetailToday}>
        <Typography fontSize={18} fontWeight={600} color={'#fff'}>
          Today
        </Typography>
        <Typography fontSize={14} fontWeight={400} color={'#fff'}>
          {formattedDate}
        </Typography>
      </View>
      <View style={styles.bottomDetailToday}>
        {nextThreeHours.map((forecast, index) => (
          <CardHourDetail key={index} forecast={forecast} />
        ))}
      </View>
    </View>

    <View style={styles.detailTomorrow}>
      <View style={styles.topDetailTomorrow}>
        <Typography fontSize={18} fontWeight={600} color="#fff">
          Next Forecast
        </Typography>
        <CalendarSvg />
      </View>
      <View style={styles.bottomDetailTomorrow}>
        {nextThreeDays.map((day, index) => (
          <CardDayDetail
            key={index}
            date={new Date(day.date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            })}
            minTemp={day.minTemp}
            maxTemp={day.maxTemp}
            conditions={day.conditions}
          />
        ))}
      </View>
    </View>
  </Container>
);

export default ForecastSection;
