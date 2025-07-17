import {useQuery} from '@tanstack/react-query';

import {topHistoryApi} from './api';

export const useCategoryList = () => {
  const {data, isLoading, error} = useQuery({
    queryKey: ['Category', 'list'],
    queryFn: () => topHistoryApi.getCategoryList(),
  });

  return {data, isLoading, error};
};
