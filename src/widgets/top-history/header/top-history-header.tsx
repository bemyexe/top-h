import {DatePicker} from 'antd';
import type {RangePickerProps} from 'antd/es/date-picker';
import clsx from 'clsx';
import type {Dayjs} from 'dayjs';

import {CountrySelect} from '../../../shared/country-select';
import {DISPLAY_DATE_FORMAT} from '../constants';
import {disabledDate} from '../helpers';

import './style.scss';

interface Props {
  dateRange: RangePickerProps['value'];
  handleDateChange: (
    dates: [Dayjs | null, Dayjs | null] | null,
    dateStrings: [string, string]
  ) => void;
  onChangeCountrySelect: (value: number[]) => void;
  className?: string;
}

const {RangePicker} = DatePicker;

export const TopHistoryHeader = ({
  dateRange,
  handleDateChange,
  onChangeCountrySelect,
  className,
}: Props) => (
  <div className={clsx('top-history-header', className)}>
    <div className="top-history-header-title">Top History</div>
    <div className="top-history-header-actions">
      <CountrySelect onChangeCountrySelect={onChangeCountrySelect} />
      <RangePicker
        value={dateRange}
        onChange={handleDateChange}
        disabledDate={disabledDate}
        format={DISPLAY_DATE_FORMAT}
      />
    </div>
  </div>
);
