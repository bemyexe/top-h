import {useState} from 'react';
import {useSelector} from 'react-redux';
import {DatePicker} from 'antd';
import type {RangePickerProps} from 'antd/es/date-picker';
import clsx from 'clsx';

import {CountrySelect} from '../../shared/country-select';
import {countrySelectors} from '../../shared/store';

import {ID_SUB_CATEGORY} from './api/api';
import {useCategoryList, useChartData} from './api';
import {
  disabledDate,
  formatAllDatesInRangeToDisplayLabels,
  formatChartDataToDatasets,
  getAllDatesInRange,
} from './helpers';
import {LineChart} from './line-chart';

import './style.scss';

interface Props {
  className?: string;
}

const {RangePicker} = DatePicker;

const DISPLAY_DATE_FORMAT = 'DD MMM YYYY';

const API_DATE_FORMAT = 'YYYY-MM-DD';

const DEFAULT_CHART_DATASET = [
  {
    label: 'Choose Date Range',
    data: [0],
  },
];

const LOADING_CHART_DATA = {
  labels: [''],
  datasets: [
    {
      label: 'Loading...',
      data: [0],
    },
  ],
};

const EMPTY_CHART_DATA = {
  labels: [''],
  datasets: [
    {
      label: 'There is no data for the selected period',
      data: [0],
    },
  ],
};

export const TopHistory = ({className}: Props) => {
  const [dateRange, setDateRange] = useState<RangePickerProps['value']>(null);

  const selectedCountry = useSelector(countrySelectors.selectCountry);

  const handleDateChange: RangePickerProps['onChange'] = (dates) => {
    setDateRange(dates);
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

  if (error) {
    return <div>error: {JSON.stringify(error)}</div>;
  }

  return (
    <div className={clsx('top-history', className)}>
      <div className="header">
        <div className="header-title">Top History</div>
        <div className="header-actions">
          <CountrySelect />
          <RangePicker
            value={dateRange}
            onChange={handleDateChange}
            disabledDate={disabledDate}
            format={DISPLAY_DATE_FORMAT}
          />
        </div>
      </div>
      <LineChart data={isLoading ? LOADING_CHART_DATA : data} />
    </div>
  );
};
