'use server'

import { createClient } from "../utils/supabase/server";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export const googleSignIn = async () => {
    console.log('Signing in with Google');
    const supabase = createClient();

    const origin = headers().get('origin');

    const { error, data } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: `${origin}`
        }
    })

    if (error) {
        console.error('Error signing in with Google: ' + error.message);
    } else {
        return redirect(data.url);
    }
}

export const updateCollection = async (itemId: string, operation: 'add' | 'remove') => {
    // console.log(` ${operation} ${itemId} in collection`);

    console.log('ACTIONS createClient()')
    const supabase = createClient();

    // Fetch the user
    console.log('ACTIONS await Supabase getUser')
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError) {
        // console.error('Error fetching user: ' + userError.message);
        return;
    }

    const userId = user?.id;

    // console.log('User ID: ', userId);

    if (!userId) {
        // console.error('User ID is null or undefined');
        return;
    }

    console.log('ACTIONS await supabase get collection')
    // Fetch the user's collection
    const { data: collection, error: collectionError } = await supabase
        .from('collection')
        .select('owned')
        .eq('user_id', userId)
        .maybeSingle();

    if (collectionError) {
        console.error('Error updating collection: ' + collectionError.message);
    }

    if (!collection) {
        console.error('No collection found for user ID: ' + userId);
        return;
    }

    // console.log('Previous owned: ', collection.owned);

    // Check if item exists in the owned array
    const itemIndex = collection.owned.findIndex((item: { id: string }) => item.id === itemId);

    let updatedOwned;
    if (itemIndex !== -1) {
        // Item exists
        if (operation === 'add') {
            // Increase the quantity
            updatedOwned = collection.owned.map((item: { id: string, quantity: number }, index: number) =>
                index === itemIndex ? { ...item, quantity: item.quantity + 1 } : item
            );
        } else if (operation === 'remove') {
            // Decrease the quantity
            updatedOwned = collection.owned.map((item: { id: string, quantity: number }, index: number) =>
                index === itemIndex ? { ...item, quantity: item.quantity - 1 } : item
            ).filter((item: { id: string, quantity: number }) => item.quantity > 0);
        }
    } else {
        // Item does not exist, add it to the array
        if (operation === 'add') {
            updatedOwned = [...collection.owned, { id: itemId, quantity: 1 }];
        } else {
            // Item not found in collection
            return;
        }
    }

    // console.log('Updated owned: ', updatedOwned);

    console.log('ACTIONS await Supabase update collection')
    const { error: updateError } = await supabase
        .from('collection')
        .update({ owned: updatedOwned })
        .eq('user_id', userId);

    if (updateError) {
        console.error(updateError);
        return;
    }
    return;
}