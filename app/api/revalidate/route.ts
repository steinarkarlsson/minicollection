import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    console.log('🔄 Revalidation webhook triggered');

    try {
        // Log all incoming headers (useful for debugging)
        console.log('📝 Request headers:', Object.fromEntries([...request.headers.entries()]));

        const body = await request.json();
        console.log('📦 Request body:', JSON.stringify(body, null, 2));

        const token = request.headers.get('x-webhook-secret');
        const expectedToken = process.env.SANITY_WEBHOOK_SECRET;

        // Log token presence (not the actual values for security)
        console.log('🔑 Token received:', token ? 'Yes' : 'No');
        console.log('🔑 Expected token configured:', expectedToken ? 'Yes' : 'No');
        console.log('🔑 Tokens match:', token === expectedToken ? 'Yes' : 'No');

        console.log('🔐 Token value (first 2 chars only):', token ? token.substring(0, 2) + '...' : 'No token');
        console.log('🔐 Expected token value (first 2 chars only):', expectedToken ? expectedToken.substring(0, 2) + '...' : 'No expected token');

        if (token !== expectedToken) {
            console.log('❌ Authentication failed: Invalid token');
            return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
        }

        console.log('✅ Authentication successful');

        // Check what document type was changed
        if (body && body._type) {
            console.log(`🔍 Document type: ${body._type}`);

            if (body._type === 'print') {
                revalidateTag('prints');
                console.log('✅ Revalidated prints tag');
            }

            if (body._type === 'edition') {
                revalidateTag('editions');
                console.log('✅ Revalidated editions tag');
            }
        } else {
            console.log('⚠️ No document type found in request body');
        }

        console.log('🎉 Revalidation complete');
        return NextResponse.json({ revalidated: true, now: Date.now() });
    } catch (err) {
        console.error('❌ Error revalidating:', err);
        return NextResponse.json({ message: 'Error revalidating', error: (err as Error).message }, { status: 500 });
    }
}