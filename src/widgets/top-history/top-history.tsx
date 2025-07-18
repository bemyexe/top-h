import {useState} from 'react';
import {Button, DatePicker} from 'antd';
import type {RangePickerProps} from 'antd/es/date-picker';
import clsx from 'clsx';
import dayjs from 'dayjs';

import {useAppSelector} from '../../shared/store/store';

import {ID_SUB_CATEGORY} from './api/api';
import {useChartData} from './api/get-chart-data';
import {useCategoryList} from './api/use-category-list';
import {formatChartData} from './helpers/format-chart-data';
import {CountrySelect} from './country-select';
import {disabledDate, getAllDatesInRange} from './helpers';
import {LineChart} from './line-chart';

import './style.scss';

interface Props {
  className?: string;
}

const {RangePicker} = DatePicker;

const DATE_FORMAT = 'DD MMM YYYY';

export const TopHistory = ({className}: Props) => {
  const [dateRange, setDateRange] = useState<RangePickerProps['value']>(null);
  const selectedCountry = useAppSelector(
    (state) => state.country.selectedCountry
  );
  console.log(selectedCountry);
  const handleDateChange: RangePickerProps['onChange'] = (dates) => {
    setDateRange(dates);
  };

  const labels = getAllDatesInRange(dateRange);
  const displayLabels = labels.map((date) => dayjs(date).format(DATE_FORMAT));

  const {data: CategoryData} = useCategoryList();
  const {data: ChartData} = useChartData(
    selectedCountry,
    dateRange?.[0]?.format('YYYY-MM-DD'),
    dateRange?.[1]?.format('YYYY-MM-DD')
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
            format={DATE_FORMAT}
          />
        </div>
      </div>
      <LineChart data={data} />
    </div>
  );
};
