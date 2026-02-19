import { useState } from "react";
// 一旦使わないのでコメントアウト
// import { AllfetchProfiles } from "./AllfetchProfiles";
// import { subDays } from "date-fns";

export const Weekly_Trend = () => {
  // 適当なダミーデータをベタ書きで設定
  const [topTitles] = useState<{ title: string, time: number }[] | null>([
    { title: "Visual Studio Code", time: 1207 },
    { title: "Apex Legends", time: 851 },
    { title: "Valorant", time: 643 }
  ]);

  /* 一旦fetchロジックをすべて無効化
  useEffect(() => {
    const fetchData = async () => {
      const profiles = await AllfetchProfiles();
      const oneWeekAgo = subDays(new Date(), 7);
      const titlePlayTime: { [title: string]: number } = {};

      profiles.forEach(profile => {
        const createdAt = new Date(profile.created_at);
        const title = profile.title || "未分類";
        titlePlayTime[title] = (titlePlayTime[title] || 0) + profile.time;
      });

      const sorted = Object.entries(titlePlayTime)
        .map(([title, time]) => ({ title, time }))
        .sort((a, b) => b.time - a.time)
        .slice(0, 3);

      setTopTitles(sorted);
    };

    fetchData();
  }, []);
  */

  if (!topTitles) return <p>読み込み中...</p>;

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-lg rounded-2xl border border-gray-200">
      <h2 className="text-xl font-bold mb-4 text-center text-blue-600">過去1週間のみんなのトレンド</h2>
      <ol className="list-decimal ml-5 space-y-2 text-gray-800">
        {topTitles.map((item, index) => (
          <li key={index} className="bg-blue-50 p-3 rounded-lg shadow-sm flex justify-between items-center">
            <span className="font-semibold">{index + 1}位：{item.title}</span>
            <span className="text-sm text-gray-600">{item.time} 分</span>
          </li>
        ))}
      </ol>
    </div>
  );
};