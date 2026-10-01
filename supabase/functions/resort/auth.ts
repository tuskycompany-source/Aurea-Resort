export async function getChatGPTUser(request:Request){
 const authorization=request.headers.get('authorization');if(!authorization?.startsWith('Bearer '))return null;
 const response=await fetch(Deno.env.get('SUPABASE_URL')+'/auth/v1/user',{headers:{Authorization:authorization,apikey:Deno.env.get('SUPABASE_ANON_KEY')!}});
 if(!response.ok)return null;const user=await response.json();
 if(!user.id||!user.email||!user.email_confirmed_at)return null;
 return {userId:user.id,email:user.email,displayName:user.user_metadata?.full_name||user.email};
}
