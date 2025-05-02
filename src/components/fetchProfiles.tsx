import { supabase } from "./supabaseClient";

// Supabaseからデータを取得（ログイン中のユーザーのプレイ情報のみ）
export async function fetchProfiles() {
  // 現在ログイン中のユーザーを取得
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  // ユーザーがログインしていない場合は、空の配列を返す
  if (userError || !user) {
    console.error("ユーザーがログインしていません");
    return [];
  }


  // ログイン中のユーザーのIDを使って、該当するプレイデータのみを取得
  const { data, error } = await supabase
    .from("game")
    .select("*")
    .eq("user_id", user?.user_metadata?.full_name)

  if (error) {
    console.error("データ取得エラー:", error);
    return [];
  }

  return data ?? [];
}
