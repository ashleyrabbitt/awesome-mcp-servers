import {handleBusiness} from './business.mjs';
Deno.serve(req=>handleBusiness(req,{env:key=>Deno.env.get(key)}));
