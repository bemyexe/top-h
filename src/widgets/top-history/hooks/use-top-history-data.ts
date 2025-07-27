import {useState} from 'react';
import {useSelector} from 'react-redux';
import type {RangePickerProps} from 'antd/es/date-picker';

import {
  countrySelectors,
  setSelectedCountry,
  useAppDispatch,
} from '../../../shared/store';
import {useCategoryList, useChartData} from '../api';
import {ID_SUB_CATEGORY} from '../api/api';
import {
  API_DATE_FORMAT,
  DEFAULT_CHART_DATASET,
  DISPLAY_DATE_FORMAT,
  EMPTY_CHART_DATA,
} from '../constants';
import {
  formatAllDatesInRangeToDisplayLabels,
  formatChartDataToDatasets,
  getAllDatesInRange,
} from '../helpers';

export const useTopHistoryData = () => {
  const [dateRange, setDateRange] = useState<RangePickerProps['value']>(null);
  const dispatch = useAppDispatch();
  const selectedCountry = useSelector(countrySelectors.selectCountry);

  const handleDateChange: RangePickerProps['onChange'] = (dates) => {
    setDateRange(dates);
  };

  const onChangeCountrySelect = (value: number[]) => {
    dispatch(setSelectedCountry(value));
  };

  const allDatesInRange = getAllDatesInRange(dateRange);
  const displayLabels = formatAllDatesInRangeToDisplayLabels(
    allDatesInRange,
    DISPLAY_DATE_FORMAT
  );

  const {data: CategoryData} = useCategoryList();
  const {
    data: ChartData,
    error,
    isLoading,
  } = useChartData(
    selectedCountry,
    dateRange?.[0]?.format(API_DATE_FORMAT),
    dateRange?.[1]?.format(API_DATE_FORMAT)
  );

  const datasets =
    dateRange && ChartData && CategoryData
      ? formatChartDataToDatasets(
          ChartData,
          CategoryData,
          ID_SUB_CATEGORY,
          allDatesInRange
        )
      : DEFAULT_CHART_DATASET;

  const data =
    ChartData && Array.isArray(ChartData)
      ? EMPTY_CHART_DATA
      : {
          labels: displayLabels,
          datasets,
        };

  return {
    dateRange,
    handleDateChange,
    onChangeCountrySelect,
    selectedCountry,
    error,
    isLoading,
    data,
  };
};
