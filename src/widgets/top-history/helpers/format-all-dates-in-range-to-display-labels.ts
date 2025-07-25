import dayjs from 'dayjs';

export const formatAllDatesInRangeToDisplayLabels = (
  allDatesInRange: string[],
  format: string
) => {
  return allDatesInRange.map((date) => dayjs(date).format(format));
};
