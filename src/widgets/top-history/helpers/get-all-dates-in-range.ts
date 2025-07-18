import type {RangePickerProps} from 'antd/es/date-picker';

export const getAllDatesInRange = (dateRange: RangePickerProps['value']) => {
  if (!dateRange) return [];

  const [start, end] = dateRange;
  const dates: string[] = [];
  let currentDate = start?.startOf('day');

  while (currentDate?.isBefore(end?.add(1, 'day'), 'day')) {
    dates.push(currentDate.format('YYYY-MM-DD'));
    currentDate = currentDate.add(1, 'day');
  }

  return dates;
};
