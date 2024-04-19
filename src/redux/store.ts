import {configureStore} from '@reduxjs/toolkit';
import weatherReducer from './weather/slice';
import {useDispatch, useSelector} from 'react-redux';

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
