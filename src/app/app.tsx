import clsx from 'clsx';

import {TopHistory} from '../widgets/top-history';

import './app.scss';

interface Props {
  className?: string;
}

export const App = ({className}: Props) => {
  return (
    <div className={clsx('app', className)}>
      App
      <TopHistory />
    </div>
  );
};
