import { NextResponse } from 'next/server';
import { authCookieName } from '../../../lib/auth';
export const runtime = 'nodejs';
export async function GET(request) {
  const res = NextResponse.redirect(new URL('/', request.url));
  res.cookies.set(authCookieName(), '', { httpOnly: true, secure: true, sameSite: 'strict', path: '/', maxAge: 0 });
  return res;
}