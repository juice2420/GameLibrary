import { useState , useEffect} from 'react'
import './App.css'
import { supabase } from './components/supabaseClient.ts'
import type { User } from '@supabase/supabase-js'
import { fetchProfiles }from "./components/fetchProfiles" 
import  ProfileList  from "./components/weekly_chart.tsx";
import {PageHeader} from "./components/PageHeader.tsx"
import {Content} from "./components/Content.tsx";
import { WeeklyPie } from './components/weekly_pie.tsx';
import {AllPie} from './components/AllPie.tsx';
import {LanguagePie} from './components/language.tsx';



export default function App() {
  const [user, setUser] = useState<User | null>(null);
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

//        <p>{user.user_metadata.full_name}</p>

  return (
    <div>
      {user ? (
        <>
        <PageHeader imageUrl = {user.user_metadata.avatar_url}/>
        <div className='flex w-full h-[400px]'>
            <div className='w-1/2 -p-4'>
                <ProfileList />
            </div>
           <div className='w-1/2 -p-4'>
              <WeeklyPie />
          </div>
          <div className='w-1/2 -p-4'>
              <AllPie />
          </div>
            <div className='w-1/2 -p-4'>
              <LanguagePie />
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