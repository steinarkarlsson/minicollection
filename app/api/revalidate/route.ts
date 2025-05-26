import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const token = request.headers.get('x-webhook-secret');
        const expectedToken = process.env.SANITY_WEBHOOK_SECRET;

        if (token !== expectedToken) {
            console.log('❌ Authentication failed: Invalid token');
            return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
        }

        if (body && body._type) {

            if (body._type === 'print') {
                revalidateTag('prints');
                console.log('✅ Revalidated prints tag');
            }

            if (body._type === 'edition') {
                revalidateTag('editions');
                console.log('✅ Revalidated editions tag');
            }

            if (body._type === 'terrain') {
                revalidateTag('terrain');
                console.log('✅ Revalidated terrain tag');
            }

            if (body._type === 'set') {
                revalidateTag('sets');
                console.log('✅ Revalidated sets tag');
            }

            if (body._type === 'releaseWave') {
                revalidateTag('releaseWaves');
                console.log('✅ Revalidated releaseWaves tag');
            }

            if (body._type === 'accessory') {
                revalidateTag('accessories');
                console.log('✅ Revalidated accessories tag');
            }

            if (body._type === 'faction') {
                revalidateTag('factions');
                console.log('✅ Revalidated factions tag');
            }

            if (body._type === 'armyList') {
                revalidateTag('armyLists');
                console.log('✅ Revalidated armyLists tag');
            }

        } else {
            console.log('⚠️ No document type found in request body');
        }

        return NextResponse.json({ revalidated: true, now: Date.now() });
    } catch (err) {
        console.error('❌ Error revalidating:', err);
        return NextResponse.json({ message: 'Error revalidating', error: (err as Error).message }, { status: 500 });
    }
}