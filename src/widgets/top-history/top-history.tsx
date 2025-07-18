import {useState} from 'react';
import {faker} from '@faker-js/faker';
import {Button, DatePicker} from 'antd';
import type {RangePickerProps} from 'antd/es/date-picker';
import clsx from 'clsx';

import {useChartData} from './api/get-chart-data';
import {useCategoryList} from './api/use-category-list';
import {CountrySelect} from './country-select';
import {disabledDate, getAllDatesInRange} from './helpers';
import {LineChart} from './line-chart';

import './style.scss';

interface Props {
  className?: string;
}

const {RangePicker} = DatePicker;

const DATE_FORMAT = 'DD MMM YYYY';

const ID_SUB = {
  1: 'Top free',
  2: 'Top Paid',
  3: 'Top Grossing',
  4: 'Top Free',
  5: 'Top Paid',
  6: 'Top Grossing',
  7: 'New Free',
  8: 'New Paid',
  9: 'Trending',
} as const;

export const TopHistory = ({className}: Props) => {
  const [dateRange, setDateRange] = useState<RangePickerProps['value']>(null);

  const handleDateChange: RangePickerProps['onChange'] = (dates) => {
    setDateRange(dates);
  };

  const labels = getAllDatesInRange(dateRange);

  const {data: CategoryData} = useCategoryList();
  const {data: ChartData} = useChartData(1, '2025-07-10', '2025-07-15');
  console.log(CategoryData);
  console.log(ChartData);
  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: labels?.map(() => faker.number.int({min: -1000, max: 1000})),
      },
      {
        label: 'Dataset 2',
        data: labels?.map(() => faker.number.int({min: -1000, max: 1000})),
      },
    ],
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
