import { NextResponse } from 'next/server';
import { getAuth } from 'firebase-admin/auth';
import { initializeApp, cert } from 'firebase-admin/app';

// Inicializa Firebase Admin solo una vez
const firebaseAdminConfig = {
    credential: cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)),
};

if (!getAuth.length) {
    initializeApp(firebaseAdminConfig);
}

export async function POST(request) {
    try {
        const { refreshToken } = await request.json(); 
        if (!refreshToken) {
            return NextResponse.json({ error: 'ID token is required' }, { status: 400 });
        }

        // Verifica el nuevo ID token
        const decodedToken = await getAuth().verifyIdToken(refreshToken);

        // Configura la cookie con el nuevo ID token
        const response = NextResponse.json({ message: 'Token refreshed' });
        response.cookies.set('token', refreshToken, {
            path: '/',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
        });

        return response;
    } catch (error) {
        console.error('Error refreshing token:', error);
        return NextResponse.json({ error: 'Failed to refresh token' }, { status: 401 });
    }
}