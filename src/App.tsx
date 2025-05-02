import { useState , useEffect} from 'react'
import './App.css'
import { supabase } from './components/supabaseClient.ts'
import type { User } from '@supabase/supabase-js'
import { fetchProfiles }from "./components/fetchProfiles" 
import  ProfileList  from "./components/weekly_chart.tsx";
import {PageHeader} from "./components/PageHeader.tsx"

export default function App() {
  const [user, setUser] = useState<User | null>(null)
  fetchProfiles();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
    })

    // リアルタイムなセッション変更を監視
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  const loginWithDiscord = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'discord',
    })
  }

  const logout = async () => {
    await supabase.auth.signOut()
  }
  



  return (
    <div>
      {user ? (
        <>
        <PageHeader />
          <img src={user.user_metadata.avatar_url} alt="avatar" width={50} />
          <p>{user.user_metadata.full_name}</p>
          <button onClick={logout}>ログアウト</button>
          <ProfileList />
        </>
      ) : (
        <button onClick={loginWithDiscord}>Discordでログイン</button>
        
      )}
    </div>
  )
}