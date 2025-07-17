import {TopHistory} from '../widgets/top-history';

const log = console.log;

interface Props {
  className?: string;
}

export const App = ({className}: Props) => {
  return (
    <div className={className}>
      App
      <TopHistory />
    </div>
  );
};
