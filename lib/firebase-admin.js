import { getAuth } from 'firebase-admin/auth';
import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import serviceAccount from '@/utils/firebaseService';

initializeApp({
    credential: cert(serviceAccount),
});

export async function verifyIdToken(token) {
    try {
        const decodedToken = await getAuth().verifyIdToken(token);
        return decodedToken;
    } catch (error) {
        console.error('Error verifying token:', error);
        return null;
    }
}