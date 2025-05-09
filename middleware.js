// middleware.ts
import { NextResponse } from 'next/server'

export function middleware(request) {
  const token = request.cookies.get('auth-token')
  const isAuthed = !!token
  const path = request.nextUrl.pathname

  const publicRoutes = ['/', '/login', '/register']

  if (!isAuthed && !publicRoutes.includes(path)) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/|favicon.ico).*)'],
}