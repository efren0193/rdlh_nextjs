import { NextResponse } from 'next/server';
import { getAuth } from 'firebase-admin/auth';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
// import serviceAccount from '@/utils/firebaseService';
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

if(!getApps().length) {
    initializeApp({
        credential: cert(serviceAccount),
    });
}

export async function POST(request) {
    try {
        const { token } = await request.json();

        if (!token) {
            return NextResponse.json({ error: 'Token is required' }, { status: 400 });
        }

        // Verifica el token con Firebase Admin
        const decodedToken = await getAuth().verifyIdToken(token);

        return NextResponse.json({ decodedToken });
    } catch (error) {
        console.error('Error verifying token:', error);
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }
}