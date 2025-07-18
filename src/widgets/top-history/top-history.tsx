import {useState} from 'react';
import {useSelector} from 'react-redux';
import {Button, DatePicker} from 'antd';
import type {RangePickerProps} from 'antd/es/date-picker';
import clsx from 'clsx';
import dayjs from 'dayjs';

import {countrySelectors} from '../../shared/store';

import {ID_SUB_CATEGORY} from './api/api';
import {formatChartData} from './helpers/format-chart-data';
import {useCategoryList, useChartData} from './api';
import {CountrySelect} from './country-select';
import {disabledDate, getAllDatesInRange} from './helpers';
import {LineChart} from './line-chart';

import './style.scss';

interface Props {
  className?: string;
}

const {RangePicker} = DatePicker;

const CLIENT_DATE_FORMAT = 'DD MMM YYYY';
const API_DATE_FORMAT = 'YYYY-MM-DD';

export const TopHistory = ({className}: Props) => {
  const [dateRange, setDateRange] = useState<RangePickerProps['value']>(null);

  const selectedCountry = useSelector(countrySelectors.selectCountry);
  const handleDateChange: RangePickerProps['onChange'] = (dates) => {
    setDateRange(dates);
  };

  const labels = getAllDatesInRange(dateRange);
  const displayLabels = labels.map((date) =>
    dayjs(date).format(CLIENT_DATE_FORMAT)
  );

  const {data: CategoryData} = useCategoryList();
  const {data: ChartData, error} = useChartData(
    selectedCountry,
    dateRange?.[0]?.format(API_DATE_FORMAT),
    dateRange?.[1]?.format(API_DATE_FORMAT)
  );

  const datasets =
    dateRange && ChartData
      ? formatChartData(ChartData, CategoryData || [], ID_SUB_CATEGORY, labels)
      : [
          {
            label: 'Choose Date Range',
            data: [0],
          },
        ];

  const data = {
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
          <Button>PNG</Button>
          <Button>CSV</Button>
          <CountrySelect />
          <RangePicker
            value={dateRange}
            onChange={handleDateChange}
            disabledDate={disabledDate}
            format={CLIENT_DATE_FORMAT}
          />
        </div>
      </div>
      <LineChart data={data} />
    </div>
  );
};
