export const DISPLAY_DATE_FORMAT = 'DD MMM YYYY';
export const API_DATE_FORMAT = 'YYYY-MM-DD';

export const DEFAULT_CHART_DATASET = [
  {
    label: 'Choose Date Range',
    data: [0],
  },
];

export const LOADING_CHART_DATA = {
  labels: [''],
  datasets: [
    {
      label: 'Loading...',
      data: [0],
    },
  ],
};

export const EMPTY_CHART_DATA = {
  labels: [''],
  datasets: [
    {
      label: 'There is no data for the selected period',
      data: [0],
    },
  ],
};
