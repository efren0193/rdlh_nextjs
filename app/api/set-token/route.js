import { NextResponse } from 'next/server';

export async function POST(request) {
    const { token } = await request.json();

    if (!token) {
        return NextResponse.json({ error: 'Token is required' }, { status: 400 });
    }

    // Establece la cookie HttpOnly con el token recibido
    return NextResponse.json(
        { message: 'Token set successfully' },
        {
            headers: {
                'Set-Cookie': `token=${token}; Path=/; HttpOnly; Secure; SameSite=Strict`,
            }
        }
    );
}