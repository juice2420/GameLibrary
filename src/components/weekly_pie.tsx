import { useEffect, useState } from "react";
import { subDays } from "date-fns";
import { fetchProfiles } from "./fetchProfiles";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const WeeklyPie = () => {
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const profiles = await fetchProfiles();
      const oneWeekAgo = subDays(new Date(), 7);
      const titlePlayTime: { [title: string]: number } = {};

      profiles.forEach(profile => {
        const createdAt = new Date(profile.created_at);
        if (createdAt >= oneWeekAgo) {
          const title = profile.title || "未分類";
          titlePlayTime[title] = (titlePlayTime[title] || 0) + profile.time;
        }
      });

      const labels = Object.keys(titlePlayTime);
      const data = Object.values(titlePlayTime);

      const backgroundColors = [
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)',
        'rgba(153, 102, 255, 0.5)',
        'rgba(255, 159, 64, 0.5)',
        'rgba(199, 199, 199, 0.5)'
      ];

      setChartData({
        labels,
        datasets: [{
          label: 'タイトルごとのプレイ時間',
          data,
          backgroundColor: backgroundColors.slice(0, labels.length),
          borderColor: backgroundColors.map(color => color.replace("0.5", "1")),
          borderWidth: 1,
        }]
      });
    };

    fetchData();
  }, []);

  if (!chartData) return <p>読み込み中...</p>;

  if (chartData.labels.length === 0) {
  return <div className="h-full flex items-center justify-center">
    <p className="text-gray-500">1週間以内のプレイデータがありません。</p>
  </div>;
}

  return (
  <div className="h-full flex flex-col">
    <h2 className="text-lg font-semibold mb-2">タイトルごとのプレイ時間（1週間）</h2>
    <div className="flex-1">
      <Pie data={chartData} options={{ maintainAspectRatio: false, responsive: true }} />
    </div>
  </div>
  );
};
