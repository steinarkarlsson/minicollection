'use server'

import {createClient} from "../utils/supabase/server";
import {redirect} from "next/navigation";
import {headers} from "next/headers";

export const googleSignIn = async () => {
    console.log('Signing in with Google');

    const supabase = createClient();
    const origin = headers().get('origin');

    const {error, data} = await supabase.auth.signInWithOAuth({
            provider: 'google',
        options: {
                redirectTo: `${origin}`
        }
        })

    if(error) {
        console.error('Error signing in with Google: ' + error.message);
    } else {
        return redirect(data.url);
    }
}