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
        if (error.code === 'auth/id-token-expired') {
            console.log('from verify-token', request)
            // const refreshResponse = await fetch(`${request.nextUrl.origin}/api/refresh-token`, {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     credentials: 'include',
            //     body: JSON.stringify({ refreshToken: request.cookies.get('refreshToken') }),
            // });

            if (refreshResponse.ok) {
                // Si el token fue renovado, continúa con la solicitud
                return NextResponse.next();
            } else {
                // Si no pudo renovar el token, redirige al login
                return NextResponse.redirect(new URL('/login', request.url));
            }
        }
        
        return NextResponse.json({ error: error.code}, { status: 401 });
    }
}