# Portal Cotizador SABERES (fuente pública cifrada)

El contenido privado del cotizador, manual, prompt y modelo PDF se almacena cifrado (AES-256-GCM) y solo se descifra en el servidor con `CONTENT_KEY`. Las credenciales se configuran exclusivamente como variables de entorno en Vercel.

Variables requeridas: `PORTAL_USER`, `PORTAL_PASSWORD`, `PORTAL_SECRET`, `CONTENT_KEY`.

Subdirectorio usado deliberadamente dentro del repositorio existente para evitar modificar el proyecto principal.