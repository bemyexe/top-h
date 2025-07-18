import {type TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';

import {countryReducer} from './country-select-slice';

export const store = configureStore({
  reducer: {
    country: countryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
