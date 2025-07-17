import {faker} from '@faker-js/faker';
import {Button, DatePicker} from 'antd';
import clsx from 'clsx';

import {CountrySelect} from './country-select/country-select';
import {DISABLED_DATE} from './helpers/disabled-date';
import {LineChart} from './line-chart/line-chart';

import './style.scss';

interface Props {
  className?: string;
}

const {RangePicker} = DatePicker;

const DATE_FORMAT = 'DD MMM YYYY';

export const TopHistory = ({className}: Props) => {
  const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
  ];

  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: labels.map(() => faker.number.int({min: -1000, max: 1000})),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Dataset 2',
        data: labels.map(() => faker.number.int({min: -1000, max: 1000})),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
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
          <RangePicker disabledDate={DISABLED_DATE} format={DATE_FORMAT} />
        </div>
      </div>
      <LineChart data={data} />
    </div>
  );
};
