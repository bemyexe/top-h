import {createSelector} from '@reduxjs/toolkit';

import type {CountryState} from './country-select-slice';
import type {RootState} from './store';

const selectCountryState: (state: RootState) => CountryState = (state) =>
  state.country;

const selectCountry = createSelector(
  selectCountryState,
  (state) => state.selectedCountry
);

export const countrySelectors = {
  selectCountry,
};
