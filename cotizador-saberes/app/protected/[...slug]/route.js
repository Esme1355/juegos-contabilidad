import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { authCookieName,isAuthenticated } from '../../../../lib/auth';
import { getAsset } from '../../../../lib/assets';
export const runtime='nodejs'; export const dynamic='force-dynamic';
export async function GET(request,{params}){
 const cookie=cookies().get(authCookieName())?.value; if(!isAuthenticated(cookie)) return NextResponse.redirect(new URL('/',request.url));
 const key=(params.slug||[]).join('/'); const a=getAsset(key); if(!a) return new NextResponse('No encontrado',{status:404});
 return new NextResponse(a.body,{headers:{'Content-Type':a.contentType,'Content-Disposition':`${a.disposition}; filename="${a.filename}"`,'Cache-Control':'private, no-store','X-Robots-Tag':'noindex, nofollow'}});
}