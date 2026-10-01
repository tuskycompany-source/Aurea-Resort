'use client';
import {createClient} from '@supabase/supabase-js';
export const supabaseUrl='https://rcvxgzzkvywznpnydmhc.supabase.co';
export const publishableKey='sb_publishable_fAP9F3EWYOP_O2DD279z6w_pndOopLr';
export const supabase=createClient(supabaseUrl,publishableKey);
