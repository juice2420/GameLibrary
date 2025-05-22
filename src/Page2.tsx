import { useState , useEffect} from 'react'
import './App.css'
import { supabase } from './components/supabaseClient.ts'
import type { User } from '@supabase/supabase-js'
import { fetchProfiles }from "./components/fetchProfiles" 
import {PageHeader} from "./components/PageHeader.tsx"
import {Content} from "./components/Content.tsx";
import ImageWithModal from './components/ImageWithModel.tsx'


export const Page2 = () =>{
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true);
  fetchProfiles();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
      setLoading(false);
    })

    // リアルタイムなセッション変更を監視
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setLoading(false);
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  if (loading) {
    // 認証チェック中はローディング表示
    return <div className="flex justify-center items-center h-screen">読み込み中...</div>;
  }
  

  return (
    <div>
      {user ? (
        <>
        <PageHeader imageUrl = {user.user_metadata.avatar_url}/>
        <div className="mx-auto p-6 space-y-10 w-screen">

        {/*-- Step 1 -->*/}
        <div className="bg-white shadow-md rounded-2xl p-6 border-l-4 border-blue-500">
          <h2 className="text-xl font-bold text-gray-800">Step 1: Botをサーバーに招待</h2>
          <p className="mt-2 text-gray-600">
            Botをdiscordのサーバーに招待し、Botがユーザーのアクティビティを取得することでぽプレイ時間を確認することができるようになります！<br/>
            Botのリンクはこちら：
            <a
            href="https://discord.com/oauth2/authorize?client_id=1361532077732008139&permissions=2147485696&redirect_uri=https%3A%2F%2Fvaztyxvyvhrhwcdabsnh.supabase.co%2Fauth%2Fv1%2Fcallback&integration_type=0&scope=bot"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline ml-1"
          >
            招待リンク
          </a>
          </p>
        </div>

        {/*-- Step 2 -->*/}
        <div className="bg-white shadow-md rounded-2xl p-6 border-l-4 border-green-500">
          <h2 className="text-xl font-bold text-gray-800">Step 2: コマンドで設定</h2>
          <p className="mt-2 text-gray-600">
            Botを招待したのちに、コマンドで設定をすることでアクティビティを取得するかどうかを設定します。<br/>
              <code className="bg-gray-100 text-gray-900 px-2 py-1 rounded font-mono border border-gray-300">
                {`/trackme`}
              </code>：プレイ時間を追跡するように設定<br />
              <code className="bg-gray-100 text-gray-900 px-2 py-1 rounded font-mono border border-gray-300">
                {`/untrackme`}
              </code>：プレイ時間を追跡を解除するように設定
          </p>
        </div>

        {/*-- Step 3 -->*/}
        <div className="bg-white shadow-md rounded-2xl p-6 border-l-4 border-purple-500">
          <h2 className="text-xl font-bold text-gray-800">Step 3: Webアプリで閲覧</h2>
          <p className="mt-2 text-gray-600">
            GameLibraryで確認
          </p>
            <div className="flex justify-center mt-4">
              <ImageWithModal />
            </div>
          
        </div>

        {/*-- Step 4 -->*/}
        <div className="bg-white shadow-md rounded-2xl p-6 border-l-4 border-red-500">
          <h2 className="text-xl font-bold text-gray-800">Step 4: VsCodeを使用している人へ</h2>
          <p className="mt-2 text-gray-600">
            VsCodeの拡張機能であるDiscord Presenceを導入し、discordのアクティビティに開いているファイルを表示できるようにすることで、GameLibraryでも使用している言語の情報を見ることができるようになります。
          </p>
        </div>
</div>

_
        </>
      ) : (
        <Content />
      )}
    </div>
  )
}

export const loginWithDiscord = async () => {
  await supabase.auth.signInWithOAuth({
    provider: 'discord',
  })
}


export const logout = async () => {
  await supabase.auth.signOut()
}