'use client';
import {useEffect} from 'react';
import {supabase} from '@/lib/supabase-client';
export default function Logout(){useEffect(()=>{supabase.auth.signOut().then(()=>location.replace('/'))},[]);return <main className="section">Déconnexion… / Signing out…</main>}
