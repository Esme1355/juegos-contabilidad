import { cookies } from 'next/headers';
import { authCookieName, isAuthenticated } from '../lib/auth';
import { LOGO_DATA } from '../lib/logo';

export const dynamic = 'force-dynamic';

const views = {
  inicio: { label: 'Inicio', src: null },
  cotizador: { label: 'Cotizador', src: '/protected/app' },
  manual: { label: 'Manual de Alicia', src: '/protected/manual' },
  prompt: { label: 'Prompt generador', src: '/protected/prompt' },
  modelo: { label: 'Modelo PDF técnico', src: '/protected/modelo' }
};

export default function Page({ searchParams }) {
  const cookie = cookies().get(authCookieName())?.value;
  const authed = isAuthenticated(cookie);
  if (!authed) {
    return <main className="login-bg"><section className="login-card">
      <img src={LOGO_DATA} className="logo-login" alt="SABERES OTEC" />
      <h1>Acceso al Cotizador</h1>
      <p>Área interna de cotizaciones y propuestas técnicas.</p>
      {searchParams?.error ? <div className="error">Usuario o clave incorrectos.</div> : null}
      <form method="post" action="/api/login">
        <label>Usuario</label><input name="username" autoComplete="username" required />
        <label>Clave</label><input name="password" type="password" autoComplete="current-password" required />
        <button type="submit">Ingresar</button>
      </form>
      <small>SABERES OTEC SpA · Uso interno</small>
    </section></main>;
  }
  const viewKey = views[searchParams?.view] ? searchParams.view : 'inicio';
  const view = views[viewKey];
  return <div className="portal">
    <header><img src={LOGO_DATA} className="logo" alt="SABERES OTEC"/><div className="account">Área interna de cotizaciones<br/><a href="/api/logout">Cerrar sesión</a></div></header>
    <nav>{Object.entries(views).map(([k,v]) => <a key={k} className={k===viewKey?'active':''} href={`/?view=${k}`}>{v.label}</a>)}</nav>
    <section className="content">{view.src ? <iframe src={view.src} title={view.label}/> : <div className="home">
      <span className="badge">Uso interno · SABERES OTEC</span><h1>Portal de Cotizaciones</h1>
      <p>Desde este único lugar Alicia puede cotizar, consultar el manual, revisar el prompt generador y abrir el modelo técnico oficial.</p>
      <div className="cards">
        <a className="card" href="/?view=cotizador"><h3>Cotizador</h3><p>Datos del cliente, curso, duración, participantes, modalidad y condiciones comerciales.</p></a>
        <a className="card" href="/?view=manual"><h3>Manual de Alicia</h3><p>Procedimiento operativo paso a paso para usar el cotizador y generar entregables.</p></a>
        <a className="card" href="/?view=prompt"><h3>Prompt generador</h3><p>Reglas oficiales para producir contenidos programáticos detallados.</p></a>
        <a className="card" href="/?view=modelo"><h3>Modelo técnico aprobado</h3><p>PDF detallado con logo, vigencia de 10 días y firma académica.</p></a>
      </div>
      <p className="download">Manual disponible dentro del portal.</p>
    </div>}</section>
  </div>;
}