import { Bar } from 'react-chartjs-2';
import { memo } from 'react';

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const VerticalBar = ({ stats }) => {
  return (
    <Bar
      data={{
        labels: ['', '', '', '', '', '', '', '', '', ''],
        datasets: [
          {
            label: 'La Mia Media',
            data: Array(10).fill(stats.average),
            backgroundColor: ['rgba(0, 64, 139, 0.2)'],
            borderColor: ['rgba(0, 64, 139, 1)'],
            type: 'line',
            pointRadius: 0,
          },
          {
            label: 'Massimo errori',
            data: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
            backgroundColor: ['rgba(38, 176, 0, 0.2)'],
            borderColor: ['rgba(38, 176, 0, 1)'],
            type: 'line',
            order: 0,
            borderJoinStyle: 'bevel',
            spanGaps: true,
            pointRadius: 0,
          },
          {
            label: 'Numero di errori',
            data: stats.quizErrors,
            backgroundColor: ['rgba(189, 6, 0, 0.2)'],
            borderColor: ['rgba(189, 6, 0, 1)'],
            borderWidth: 1,
          },
        ],
      }}
      options={options}
    />
  );
};

export default memo(VerticalBar);
