import { NextResponse } from 'next/server';

export async function POST(request) {
    const res = NextResponse.json({ message: 'Logged out successfully' });

    // Elimina la cookie 'token'
    res.cookies.set('token', '', {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
        maxAge: 0,
    });

    // Elimina la cookie 'refreshToken'
    res.cookies.set('refreshToken', '', {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
        maxAge: 0,
    });

    return res;
}