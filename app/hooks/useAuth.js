import { useEffect } from 'react';
import { auth } from '@/lib/firebase-client';

export function useAuth() {
    useEffect(() => {
        const interval = setInterval(async () => {
            if (auth.currentUser) {
                try {
                    const idToken = await auth.currentUser.getIdToken(true);
                    await fetch('/api/set-token', {
                        method: 'POST',
                        body: JSON.stringify({ token: idToken }),
                    });
                } catch (error) {
                    console.error('Error refreshing token:', error);
                }
            }
        }, 60 * 60 * 1000); // Cada hora

        return () => clearInterval(interval);
    }, []);
}