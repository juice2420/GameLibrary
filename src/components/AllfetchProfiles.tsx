import { supabase } from "./supabaseClient";

// Supabaseからデータを取得（ログイン中のユーザーのプレイ情報のみ）
export async function AllfetchProfiles() {
  // 現在ログイン中のユーザーを取得
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  // ユーザーがログインしていない場合は、空の配列を返す
  if (userError || !user) {
    console.error("ユーザーがログインしていません");
    return [];
  }


  const { data, error } = await supabase
    .from("game")
    .select("*")

  if (error) {
    console.error("データ取得エラー:", error);
    return [];
  }

  return data ?? [];
}
