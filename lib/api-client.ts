'use client';
import {supabase,supabaseUrl,publishableKey} from './supabase-client';
export async function apiFetch(path:string,init:RequestInit={}){
 const {data:{session}}=await supabase.auth.getSession();
 const headers=new Headers(init.headers);headers.set('apikey',publishableKey);
 if(session)headers.set('Authorization','Bearer '+session.access_token);
 const query=path.includes('?')?path.slice(path.indexOf('?')):'';
 return fetch(supabaseUrl+'/functions/v1/resort'+query,{...init,headers});
}
