import app_0 from './chunks/app_0';
import app_1 from './chunks/app_1';
import app_2 from './chunks/app_2';
import app_3 from './chunks/app_3';
import app_4 from './chunks/app_4';
import app_5 from './chunks/app_5';
import app_6 from './chunks/app_6';
import manual_0 from './chunks/manual_0';
import prompt_0 from './chunks/prompt_0';
import modelo_0 from './chunks/modelo_0';
import modelo_1 from './chunks/modelo_1';
import modelo_2 from './chunks/modelo_2';
import modelo_3 from './chunks/modelo_3';
import modelo_4 from './chunks/modelo_4';
import modelo_5 from './chunks/modelo_5';
import modelo_6 from './chunks/modelo_6';
import modelo_7 from './chunks/modelo_7';
import modelo_8 from './chunks/modelo_8';
import crypto from 'crypto';
import zlib from 'zlib';
export const ASSETS={
  "app": {...{"iv":"/2aEGkCWpUXDDaiZ","contentType":"text/html; charset=utf-8","filename":"app.html","disposition":"inline"}, data: [app_0,app_1,app_2,app_3,app_4,app_5,app_6].join('')},
  "manual": {...{"iv":"73n9kd/Rd9EUA8qf","contentType":"text/html; charset=utf-8","filename":"manual.html","disposition":"inline"}, data: [manual_0].join('')},
  "prompt": {...{"iv":"byr/QI64QOzmi60r","contentType":"text/html; charset=utf-8","filename":"prompt.html","disposition":"inline"}, data: [prompt_0].join('')},
  "modelo": {...{"iv":"As6SEZegS6bUbO5c","contentType":"application/pdf","filename":"Modelo_Contenido_Programatico_SABERES.pdf","disposition":"inline"}, data: [modelo_0,modelo_1,modelo_2,modelo_3,modelo_4,modelo_5,modelo_6,modelo_7,modelo_8].join('')},
};

export function getAsset(key){
 const a=ASSETS[key]; if(!a) return null;
 const hex=process.env.CONTENT_KEY||''; if(!/^[0-9a-fA-F]{64}$/.test(hex)) throw new Error('CONTENT_KEY missing or invalid');
 const keybuf=Buffer.from(hex,'hex'), iv=Buffer.from(a.iv,'base64'), packed=Buffer.from(a.data,'base64');
 const tag=packed.subarray(packed.length-16), body=packed.subarray(0,packed.length-16);
 const d=crypto.createDecipheriv('aes-256-gcm',keybuf,iv); d.setAuthTag(tag);
 const gz=Buffer.concat([d.update(body),d.final()]);
 return {body:zlib.gunzipSync(gz),contentType:a.contentType,filename:a.filename,disposition:a.disposition};
}