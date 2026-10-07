import {createHash} from 'node:crypto';
import {validateSubmission} from './public/submissions.mjs';
export function createLimiter(){const windows=new Map();return (key,limit=5,now=Date.now())=>{for(const [k,v] of windows)if(v.expires<=now)windows.delete(k);const row=windows.get(key)||{count:0,expires:now+3600000};if(row.count>=limit)return false;row.count++;windows.set(key,row);return true;};}
export async function saveSubmission(data,{base=process.env.SUPERPOWERS_SUPABASE_URL,key=process.env.SUPERPOWERS_SUPABASE_PUBLISHABLE_KEY,fetcher=fetch}={}){
 if(!base||!key)throw new Error('Submission storage unavailable');
 const response=await fetcher(base+'/rest/v1/superpowers_submissions',{method:'POST',headers:{apikey:key,'Content-Type':'application/json',Prefer:'return=minimal'},body:JSON.stringify(data),signal:AbortSignal.timeout(8000)});
 if(!response.ok){const error=await response.json().catch(()=>({}));if(response.status===409&&error.code==='23505')return;throw new Error('Submission storage unavailable');}
}
export async function submissionRequest(req,{save=saveSubmission,allow=createLimiter()}={}){
 if(req.headers['sec-fetch-site']==='cross-site')return {status:403,body:{error:'Please submit from the Superpowers website.'}};
 if(!(req.headers['content-type']||'').toLowerCase().startsWith('application/json'))return {status:415,body:{error:'Send a JSON submission.'}};
 if(Number(req.headers['content-length'])>16000)return {status:413,body:{error:'Your submission is too long.'}};
 let raw='',size=0;for await(const chunk of req){size+=Buffer.byteLength(chunk);if(size>16000)return {status:413,body:{error:'Your submission is too long.'}};raw+=chunk;}
 let input;try{input=JSON.parse(raw)}catch{return {status:400,body:{error:'The form could not be read. Please retry.'}};}
 const {data,errors}=validateSubmission(input);if(errors.length)return {status:400,body:{error:errors.join(' ')}};
 const id=input.request_id;if(typeof id!=='string'||! /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id))return {status:400,body:{error:'Refresh the form and try again.'}};
 const emailKey=createHash('sha256').update(data.contact_email).digest('hex');
 if(!allow('all',100)||!allow(emailKey,5))return {status:429,body:{error:'Too many submissions. Please try again in an hour.'}};
 try{await save({id,...data});return {status:201,body:{reference:id,status:'pending'}};}catch{return {status:503,body:{error:'We could not confirm receipt. Your entries are still here; please retry. If this continues, email info@waymaker.cx.'}};}
}
