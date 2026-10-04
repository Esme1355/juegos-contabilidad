import crypto from 'crypto';
const COOKIE='saberes_cotizador_auth';
function expectedToken(){const secret=process.env.PORTAL_SECRET||'';const user=process.env.PORTAL_USER||'';return crypto.createHmac('sha256',secret).update(user).digest('hex');}
export function validCredentials(user,password){const eu=process.env.PORTAL_USER||'';const ep=process.env.PORTAL_PASSWORD||'';const u=Buffer.from(String(user||''));const ub=Buffer.from(eu);const p=Buffer.from(String(password||''));const pb=Buffer.from(ep);return u.length===ub.length&&p.length===pb.length&&crypto.timingSafeEqual(u,ub)&&crypto.timingSafeEqual(p,pb);}
export function authCookieName(){return COOKIE;} export function authToken(){return expectedToken();}
export function isAuthenticated(v){const a=Buffer.from(String(v||''));const b=Buffer.from(expectedToken());return a.length===b.length&&a.length>0&&crypto.timingSafeEqual(a,b);}