import {useQuery} from '@tanstack/react-query';

import {topHistoryApi} from './api';

export const useCountryList = () => {
  const {data, isLoading, error} = useQuery({
    queryKey: ['country', 'list'],
    queryFn: () => topHistoryApi.getCountryList(),
  });

  return {data, isLoading, error};
};
