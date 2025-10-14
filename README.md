# GameLibrary

GameLibraryは、Discordのアクティビティからゲームのプレイ履歴を取得し、可視化するWebサービスです。  
自分や他のユーザーのゲームプレイ時間やトレンドをグラフで確認できます。

↓こちらでGameLibraryにアクセスできます。<br>
https://game-library-alpha-rosy.vercel.app/

## 主な機能

- Discordアカウントでログイン
- ゲームごとのプレイ時間をグラフで表示（全期間・直近1週間）
- みんなのトレンド（直近1週間の人気タイトルランキング）
- 使用言語ごとのプレイ時間集計（VSCode拡張機能連携時）
- Discord Botをサーバーに招待してプレイ履歴を自動取得

## 技術スタック

- フロントエンド: React + TypeScript + Vite
- UI: Tailwind CSS
- グラフ描画: Chart.js, react-chartjs-2
- バックエンド: Supabase (認証・データベース)
- 日付処理: date-fns

## セットアップ方法

1. リポジトリをクローン
2. 必要なパッケージをインストール

   ```sh
   npm install
   ```

3. Supabaseのプロジェクトを作成し、`.env`またはViteの環境変数に  
   `VITE_SUPABASE_URL` と `VITE_SUPABASE_ANON_KEY` を設定

4. 開発サーバーを起動

   ```sh
   npm run dev
   ```

5. ブラウザで `http://localhost:5173` にアクセス

## 使い方

1. トップページで「ログインはこちら」ボタンからDiscord認証
2. BotをDiscordサーバーに招待し、コマンドで設定
3. プレイ履歴やトレンド、グラフをWebアプリで確認

## ディレクトリ構成

- `src/` ... ソースコード
  - `components/` ... 各種コンポーネント
  - `App.tsx` ... メイン画面
  - `Page1.tsx`, `Page2.tsx` ... サブページ
- `public/` ... 公開用静的ファイル

