import {GET,POST} from './route.ts';
// Authentication is verified against Supabase Auth in every handler. Public GET
// catalog requests do not require a session. No cookies are used for authorization.
Deno.serve(async request=>{
 const origin=request.headers.get('origin')||'';
 const allowed=['https://aurea-resort.onrender.com','http://localhost:3000'];
 const headers={'Access-Control-Allow-Origin':allowed.includes(origin)?origin:allowed[0],'Access-Control-Allow-Headers':'authorization, apikey, content-type, x-client-info','Access-Control-Allow-Methods':'GET, POST, OPTIONS','Vary':'Origin'};
 if(request.method==='OPTIONS')return new Response(null,{status:204,headers});
 if(origin&&!allowed.includes(origin))return Response.json({error:'Origin not allowed'},{status:403,headers});
 try{const response=await (request.method==='GET'?GET(request):request.method==='POST'?POST(request):Promise.resolve(new Response(null,{status:405})));
 for(const [k,v] of Object.entries(headers))response.headers.set(k,v);return response;
 }catch{ return Response.json({error:'Service unavailable. Please retry.'},{status:503,headers}); }
});
