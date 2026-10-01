'use client';
import {useEffect,useState} from 'react';
import {supabase} from '@/lib/supabase-client';
export default function Login(){
 const [mode,setMode]=useState<'login'|'signup'|'reset'|'update'>('login'),[busy,setBusy]=useState(false),[message,setMessage]=useState(''),[fr,setFr]=useState(true);
 useEffect(()=>{setFr(localStorage.getItem('aurea-language')!=='en');const {data:{subscription}}=supabase.auth.onAuthStateChange(event=>{if(event==='PASSWORD_RECOVERY')setMode('update')});return()=>subscription.unsubscribe()},[]);
 async function submit(e:React.FormEvent<HTMLFormElement>){e.preventDefault();setBusy(true);setMessage('');const f=new FormData(e.currentTarget),email=String(f.get('email')||''),password=String(f.get('password')||'');try{
 let error;
 if(mode==='signup'){({error}=await supabase.auth.signUp({email,password,options:{emailRedirectTo:location.origin+'/login/',data:{full_name:String(f.get('name')||'')}}}));if(!error)setMessage(fr?'Consultez votre e-mail pour confirmer votre compte.':'Check your email to confirm your account.');}
 else if(mode==='reset'){({error}=await supabase.auth.resetPasswordForEmail(email,{redirectTo:location.origin+'/login/'}));if(!error)setMessage(fr?'Si votre compte existe, un lien vous sera envoyé.':'If an account exists, a recovery link will be sent.');}
 else if(mode==='update'){({error}=await supabase.auth.updateUser({password}));if(!error){setMessage(fr?'Mot de passe modifié.':'Password updated.');setMode('login')}}
 else{({error}=await supabase.auth.signInWithPassword({email,password}));if(!error){const path=new URLSearchParams(location.search).get('return_to')||'/account';const url=new URL(path,location.origin);location.href=url.origin===location.origin?url.href:'/account';}}
 if(error)throw error;
 }catch(e){setMessage(e instanceof Error?e.message:'Please try again.')}finally{setBusy(false)}}
 return <main className="section" style={{maxWidth:560,margin:'auto'}}><a className="brand" href="/">AURÉA<span>HOTELS & RESORTS</span></a><h1 style={{margin:'40px 0 24px',fontSize:38}}>{mode==='signup'?(fr?'Créer un compte':'Create an account'):mode==='reset'?(fr?'Réinitialiser le mot de passe':'Reset password'):mode==='update'?(fr?'Nouveau mot de passe':'New password'):(fr?'Bienvenue à nouveau':'Welcome back')}</h1><form onSubmit={submit} className="admin-panel">
 {mode==='signup'&&<label>{fr?'Nom':'Name'}<input name="name" autoComplete="name" maxLength={100} required/></label>}
 {mode!=='update'&&<label>E-mail<input type="email" name="email" autoComplete="email" required/></label>}
 {mode!=='reset'&&<label>{fr?'Mot de passe':'Password'}<input type="password" name="password" autoComplete={mode==='login'?'current-password':'new-password'} minLength={mode==='login'?1:10} maxLength={128} required/></label>}
 <button className="button navy full" disabled={busy}>{busy?'…':fr?'Continuer':'Continue'}</button>{message&&<p role="status">{message}</p>}</form>
 <div style={{display:'flex',gap:16,marginTop:24,flexWrap:'wrap'}}>{(['login','signup','reset'] as const).filter(x=>x!==mode).map(x=><button key={x} className="button" onClick={()=>{setMode(x);setMessage('')}}>{x==='login'?(fr?'Connexion':'Sign in'):x==='signup'?(fr?'Créer un compte':'Create account'):(fr?'Mot de passe oublié ?':'Forgot password?')}</button>)}</div><p className="fineprint">{fr?'Votre compte permet de retrouver vos réservations.':'Your account lets you manage your reservations.'}</p></main>
}
