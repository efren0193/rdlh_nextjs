import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const { token, refreshToken } = await request.json();

        if (!token || !refreshToken) {
            return NextResponse.json({ error: 'Tokens are required' }, { status: 400 });
        }

        const response = NextResponse.json({ message: 'Tokens set successfully' });

        // 🔥 Forma correcta de establecer cookies en Next.js
        response.cookies.set('token', token, {
            path: '/',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Lax',
        });

        response.cookies.set('refreshToken', refreshToken, {
            path: '/',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Lax',
        });

        return response;
    } catch (error) {
        console.error('Error setting cookies:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}