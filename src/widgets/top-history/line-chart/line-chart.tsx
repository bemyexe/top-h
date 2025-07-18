import {Line} from 'react-chartjs-2';
import {
  CategoryScale,
  Chart as ChartJS,
  type ChartData,
  Colors,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';

interface Props {
  className?: string;
  data: ChartData<'line'>;
}

const OPTIONS = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom' as const,
    },
  },
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Colors
);

export const LineChart = ({className, data}: Props) => {
  return <Line options={OPTIONS} data={data} className={className} />;
};
