import {useEffect} from 'react';

import {TOP_HISTORY_API} from '../widgets/top-history/api';
import {LineChart} from '../widgets/top-history/line-chart';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const log = console.log;

interface Props {
  className?: string;
}

export const App = ({className}: Props) => {
  useEffect(() => {
    const getCountry = async () => {
      const data = await TOP_HISTORY_API.getCountryList();
      log('data', data);
    };
    getCountry();
  }, []);

  return (
    <div className={className}>
      App
      <LineChart />
    </div>
  );
};
