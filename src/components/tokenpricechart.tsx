import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Line } from 'react-chartjs-2';
import moment from 'moment';

const GET_TOKEN_PRICE_HISTORY = gql`
  query tokenPriceHistory($id: ID!, $from: Int!, $to: Int!) {
    tokenDayDatas(where: { token: $id, date_gte: $from, date_lte: $to }) {
      date
      priceUSD
    }
  }
`;

interface TokenPriceChartProps {
  tokenId: string;
}

const TokenPriceChart: React.FC<TokenPriceChartProps> = ({ tokenId }) => {
  const { loading, error, data } = useQuery(GET_TOKEN_PRICE_HISTORY, {
    variables: {
      id: tokenId,
      from: moment().subtract(30, 'days').unix(),
      to: moment().unix()
    }
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error! {error.message}</div>;

  const chartData = {
    labels: [] as string[],
    datasets: [
      {
        label: 'Price (USD)',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [] as number[]
      }
    ]
  };

  if (data && data.tokenDayDatas) {
    data.tokenDayDatas.forEach((tokenDayData: any) => {
      const date = moment.unix(tokenDayData.date).format('MMM D');
      chartData.labels.push(date);
      chartData.datasets[0].data.push(tokenDayData.priceUSD);
    });
  }

  return (
    <Line data={chartData} />
  );
};

export default TokenPriceChart;