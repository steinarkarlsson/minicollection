import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const token = request.headers.get('x-webhook-secret');
        const expectedToken = process.env.SANITY_WEBHOOK_SECRET;

        if (token !== expectedToken) {
            return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
        }

        // Check what document type was changed
        if (body && body._type) {
            if (body._type === 'print') {
                revalidateTag('prints');
                console.log('Revalidated prints tag');
            }

            if (body._type === 'edition') {
                revalidateTag('editions');
                console.log('Revalidated editions tag');
            }
        }

        return NextResponse.json({ revalidated: true, now: Date.now() });
    } catch (err) {
        console.error('Error revalidating:', err);
        return NextResponse.json({ message: 'Error revalidating' }, { status: 500 });
    }
}