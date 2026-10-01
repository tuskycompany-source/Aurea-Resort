import postgres from 'npm:postgres@3.4.7';
const sql=postgres(Deno.env.get('SUPABASE_DB_URL')!,{prepare:false,max:2,idle_timeout:20,connect_timeout:10});
function translate(query:string){let i=0;let result=query.replace(/\?/g,()=>'$'+(++i));if(result.startsWith('INSERT OR IGNORE'))result=result.replace('INSERT OR IGNORE','INSERT')+' ON CONFLICT DO NOTHING';return result}
class Statement {
 constructor(public query:string,public values:unknown[]=[]){ }
 bind(...values:unknown[]){return new Statement(this.query,values)}
 async execute(client:typeof sql=sql){try{return await client.unsafe(translate(this.query),this.values as never[])}catch(e){if(e.code==='23505')throw Error('UNIQUE constraint');if(e.code==='23503')throw Error('FOREIGN KEY constraint');throw e}}
 async all<T=Record<string,unknown>>(){return {results:Array.from(await this.execute()) as T[]}}
 async first<T=Record<string,unknown>>(){return (await this.all<T>()).results[0]??null}
 async run(){const r=await this.execute();return {meta:{changes:r.count}}}
}
export function database(){return {prepare:(q:string)=>new Statement(q),batch:async(statements:Statement[])=>sql.begin(async tx=>{const results=[];for(const s of statements)results.push(await s.execute(tx as unknown as typeof sql));return results})}}
