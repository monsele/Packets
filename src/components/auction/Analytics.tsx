import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface AnalyticsProps {
  data: {
    labels: string[];
    values: number[];
  };
  period: string;
  onPeriodChange: (period: string) => void;
}

export default function Analytics({ data, period, onPeriodChange }: AnalyticsProps) {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Property Value (USDT)',
        data: data.values,
        borderColor: 'rgb(59, 130, 246)',
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Sales history of this property</h3>
        <select
          value={period}
          onChange={(e) => onPeriodChange(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="1">1 Year</option>
          <option value="4">4 Years</option>
        </select>
      </div>

      <div className="h-64">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}