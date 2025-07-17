import type {RangePickerProps} from 'antd/es/date-picker';
import dayjs from 'dayjs';

export const DISABLED_DATE: RangePickerProps['disabledDate'] = (current) => {
  const tooEarly =
    current && current < dayjs().subtract(30, 'days').endOf('day');

  const tooLate = current && current > dayjs().endOf('day');

  return !!tooEarly || !!tooLate;
};
