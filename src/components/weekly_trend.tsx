import { useEffect, useState } from "react";
import { AllfetchProfiles } from "./AllfetchProfiles";
import { subDays } from "date-fns";

export const Weekly_Trend = () => {
  const [topTitles, setTopTitles] = useState<{ title: string, time: number }[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const profiles = await AllfetchProfiles();
      const oneWeekAgo = subDays(new Date(), 7);
      const titlePlayTime: { [title: string]: number } = {};

      profiles.forEach(profile => {
        const createdAt = new Date(profile.created_at);
        if (createdAt >= oneWeekAgo) {
          const title = profile.title || "未分類";
          titlePlayTime[title] = (titlePlayTime[title] || 0) + profile.time;
        }
      });

      // オブジェクトを配列に変換してソート
      const sorted = Object.entries(titlePlayTime)
        .map(([title, time]) => ({ title, time }))
        .sort((a, b) => b.time - a.time) // 時間が多い順
        .slice(0, 3); // 上位3つだけにする

      setTopTitles(sorted);
    };

    fetchData();
  }, []);

  if (!topTitles) return <p>読み込み中...</p>;

  return (
    <div>
      <h2>過去1週間のプレイ時間トップ3</h2>
      <ol className="list-decimal ml-5">
        {topTitles.map((item, index) => (
          <li key={index}>
            {item.title}：{item.time} 分
          </li>
        ))}
      </ol>
    </div>
  );
};
