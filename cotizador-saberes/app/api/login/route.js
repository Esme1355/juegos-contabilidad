import { NextResponse } from 'next/server';
import { authCookieName, authToken, validCredentials } from '../../../lib/auth';

export const runtime = 'nodejs';

export async function POST(request) {
  const form = await request.formData();
  const user = form.get('username');
  const password = form.get('password');
  if (!validCredentials(user, password)) {
    return NextResponse.redirect(new URL('/?error=1', request.url), 303);
  }
  const res = NextResponse.redirect(new URL('/', request.url), 303);
  res.cookies.set(authCookieName(), authToken(), {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 10
  });
  return res;
}