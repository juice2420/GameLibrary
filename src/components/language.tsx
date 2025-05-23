import { useEffect, useState } from "react";
import { fetchProfiles } from "./fetchProfiles";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const getLanguageFromFileName = (fileName: string): string => {
  // 拡張子から言語を判定する
  const ext = fileName.split('.').pop()?.toLowerCase();
  switch (ext) {
    case 'mjs': case 'js' :return 'JavaScript';
    case 'ts': return 'TypeScript';
    case 'py': return 'Python';
    case 'java': return 'Java';
    case 'rb': return 'Ruby';
    case 'go': return 'Go';
    case 'html': return 'HTML';
    case 'css': return 'CSS';
    case 'c': return 'C';
    case 'cpp': return 'C+';
    case 'cs' : return 'C#';
    default: return 'その他';
  }
};

export const LanguagePie = () => {
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const profiles = await fetchProfiles();
      const languagePlayTime: { [language: string]: number } = {};  // 言語ごとの集計

      profiles.forEach(profile => {
        if (profile.title !== "Visual Studio Code") return;
        const languageStr = profile.language || "";  // `language`カラムからファイル名を取得
        const language = getLanguageFromFileName(languageStr);  // 拡張子から言語を判定
        const time = profile.time || 0;

        // 言語ごとの集計
        languagePlayTime[language] = (languagePlayTime[language] || 0) + time;
      });

      const languageLabels = Object.keys(languagePlayTime);
      const languageData = Object.values(languagePlayTime);

      const backgroundColors: string[] = [  // 型を明示的に指定
        'rgba(241, 224, 90, 0.5)',
        'rgba(43, 116, 137, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)',
        'rgba(153, 102, 255, 0.5)',
        'rgba(255, 159, 64, 0.5)',
        'rgba(199, 199, 199, 0.5)',
      ];

      setChartData({
        languageLabels,
        languageData,
        backgroundColors,
      });
    };

    fetchData();
  }, []);

  if (!chartData) return <p>読み込み中...</p>;
  if (chartData.languageLabels.length === 0) {
  return (
    <div className="h-full flex items-center justify-center">
      <p className="text-gray-500">記録されたプレイデータがありません。</p>
    </div>
  );
}

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-lg font-semibold mb-2">言語ごとのプレイ時間（全期間）</h2>
      <div className="flex-1">
        <Pie
          data={{
            labels: chartData.languageLabels,
            datasets: [{
              label: '言語ごとのプレイ時間',
              data: chartData.languageData,
              backgroundColor: chartData.backgroundColors.slice(0, chartData.languageLabels.length),
              borderColor: chartData.backgroundColors.map((color: string) => color.replace("0.5", "1")),  // 型を指定
              borderWidth: 1,
            }]
          }}
          options={{ maintainAspectRatio: false, responsive: true }}
        />
      </div>
    </div>
  );
};
