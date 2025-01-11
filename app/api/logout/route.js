// app/api/logout/route.js
import { NextResponse } from 'next/server';

export async function POST(request) {
    // Establece la cookie con el valor vacío y con maxAge en 0 para eliminarla
    return NextResponse.json(
        { message: 'Logged out successfully' },
        {
            headers: {
                'Set-Cookie': `token=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`,
            }
        }
    );
}