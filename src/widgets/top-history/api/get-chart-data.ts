import {useQuery} from '@tanstack/react-query';

import {type Country, topHistoryApi} from './api';

export const useChartData = (
  countryId: Country['id'],
  dateFrom: string = '',
  dateTo: string = ''
) => {
  const {data, isLoading, error} = useQuery({
    queryKey: ['chart', 'data', countryId, dateFrom, dateTo],
    queryFn: () => topHistoryApi.getChartData(countryId, dateFrom, dateTo),
    enabled: !!dateFrom && !!dateTo,
  });

  return {data: data?.data, isLoading, error};
};
