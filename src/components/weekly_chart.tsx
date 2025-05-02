import { useEffect, useState } from "react";
import { subDays, format } from "date-fns";
import { fetchProfiles } from "./fetchProfiles";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Chart.jsの設定
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// グラフのオプション設定
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: '直近1週間のプレイ時間',
    },
  },
};

export default function ProfileList() {
  const [dailyPlayTime, setDailyPlayTime] = useState<any[]>([]);

  // データを取得して日別に集計
  useEffect(() => {
    const fetchData = async () => {
      const profiles = await fetchProfiles();
      const oneWeekAgo = subDays(new Date(), 7);
      const playTimeByDay: { [key: string]: number } = {};

      
    console.log("取得したprofiles:", profiles);
    console.log("1週間前:", oneWeekAgo.toISOString());

      profiles.forEach((profile) => {
        const createdAt = new Date(profile.created_at);
        if (createdAt >= oneWeekAgo) {
          const dateKey = format(createdAt, "yyyy-MM-dd");
          playTimeByDay[dateKey] = (playTimeByDay[dateKey] || 0) + profile.time;
        }
      });

      // 直近7日間のデータを集計
      const dailyData = [];
      for (let i = 6; i >= 0; i--) {
        const date = format(subDays(new Date(), i), "yyyy-MM-dd");
        dailyData.push({
          date,
          time: playTimeByDay[date] || 0, // データがなければ0分
        });
      }
      setDailyPlayTime(dailyData);
    };

    fetchData();
  }, []);

  // グラフ用のデータ作成
  const data = {
    labels:  dailyPlayTime.map((entry) => format(new Date(entry.date), "MM-dd")),
    datasets: [
      {
        label: 'プレイ時間',
        data: dailyPlayTime.map((entry) => entry.time),  // プレイ時間をデータに
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return (
    <div>
      <h2>直近1週間のプレイ時間グラフ</h2>
      {/* グラフを表示 */}
      <Line options={options} data={data} />
    </div>
  );
}
