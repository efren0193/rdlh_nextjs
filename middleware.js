import { NextResponse } from "next/server";

// Middleware para verificar el token
export async function middleware(request) {
    const path = request.nextUrl.pathname;
    const isPublicPath = path === '/login';

    // Obtener el token de las cookies
    const token = request.cookies.get('token')?.value || '';

    if (isPublicPath && token) {
        // Redirige a /dashboard si ya tiene un token
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    if (!isPublicPath && !token) {
        // Redirige a /login si no tiene token y está en una ruta protegida
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // Verificación del token si no estamos en la página de login
    if (token && !isPublicPath) {
        try {
            const verifyResponse = await fetch(`${request.nextUrl.origin}/api/verify-token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token }),
            });

            if (!verifyResponse.ok) {
                // Si el token expiró, intenta refrescarlo
                
                const refreshResponse = await fetch(`${request.nextUrl.origin}/api/refresh-token`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify({ refreshToken: request.cookies.get('refreshToken') }),
                });
    
                if (!refreshResponse.ok) {
                    throw new Error('Token refresh failed');
                }
            }

            const data = await verifyResponse.json();
            
            if (data.error) {
                // Si el token no es válido, redirige a login
                return NextResponse.redirect(new URL('/login', request.url));
            }
        } catch (error) {
            console.error("Error al verificar el token:", error);
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/login',
        '/dashboard/:path*'
    ]
};