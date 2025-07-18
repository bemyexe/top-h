import {createSlice} from '@reduxjs/toolkit';

export interface CountryState {
  selectedCountry: number;
}

const initialState: CountryState = {
  selectedCountry: 1,
};

export const countrySlice = createSlice({
  name: 'country',
  initialState,
  reducers: {
    setSelectedCountry: (state, action) => {
      state.selectedCountry = action.payload;
    },
  },
});

export const {setSelectedCountry} = countrySlice.actions;
export const countryReducer = countrySlice.reducer;
