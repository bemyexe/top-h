import clsx from 'clsx';

import {LOADING_CHART_DATA} from './constants';
import {TopHistoryHeader} from './header';
import {useTopHistoryData} from './hooks';
import {LineChart} from './line-chart';

import './style.scss';

interface Props {
  className?: string;
}

export const TopHistory = ({className}: Props) => {
  const {
    dateRange,
    handleDateChange,
    onChangeCountrySelect,
    error,
    isLoading,
    data,
  } = useTopHistoryData();

  if (error) {
    return <div>error: {JSON.stringify(error)}</div>;
  }

  return (
    <div className={clsx('top-history', className)}>
      <TopHistoryHeader
        dateRange={dateRange}
        handleDateChange={handleDateChange}
        onChangeCountrySelect={onChangeCountrySelect}
      />
      <LineChart data={isLoading ? LOADING_CHART_DATA : data} />
    </div>
  );
};
