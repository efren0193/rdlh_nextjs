import { NextResponse } from 'next/server';

export async function middleware(request) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === '/login';
  const token = request.cookies.get('token')?.value || '';

  // Redirecciones básicas
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Verificación del token solo para rutas protegidas
  if (token && !isPublicPath) {
    try {
      const verifyResponse = await fetch(`${request.nextUrl.origin}/api/verify-token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });

      if (!verifyResponse.ok) {
        throw new Error('Token verification failed');
      }

      return NextResponse.next();

    } catch (error) {
      console.error('Error verifying token:', error);
      
      // Limpia la cookie y redirige al login
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('token');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/login', '/dashboard/:path*'],
};