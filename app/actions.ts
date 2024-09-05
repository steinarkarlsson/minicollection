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

export const addToCollection = async (itemId: string) => {
    console.log('Adding to collection: ', itemId);

    const supabase = createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError) {
        console.error('Error fetching user: ' + userError.message);
        return;
    }

    const userId = user?.id;
    const { data: collection, error: collectionError } = await supabase
        .from('collection')
        .select('owned')
        .eq('userId', userId)
        .single();

    if (collectionError) {
        console.error('Error fetching collection: ' + collectionError.message);
        return;
    }

    const updatedOwned = [...collection.owned, { id: itemId }];

    const { error: updateError } = await supabase
        .from('collection')
        .update({ owned: updatedOwned })
        .eq('userId', userId);

    if (updateError) {
        console.error('Error updating collection: ' + updateError.message);
    } else {
        console.log('Added to collection: ', itemId);
    }
}