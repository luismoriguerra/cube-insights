import { a } from './chunk-YKXR5KGU.mjs';
import { useMemo } from 'react';
import { jsx } from 'react/jsx-runtime';

var d=t=>{switch(t){case"small":return "px-4 py-2.5";case"large":return "px-6 py-3";default:return "px-5 py-2.5"}},i=t=>t?"text-white bg-pink-600 border-pink-600 dark:bg-pink-700 dark:border-pink-700":"text-slate-700 bg-transparent border-slate-700 dark:text-white dark:border-white";var x=b=>{var o=b,{primary:t=!1,size:e="medium",label:n=""}=o;a(o,["primary","size","label"]);useMemo(()=>{let r=i(t),a=d(e);return [r,a].join(" ")},[t,e]);return jsx("button",{type:"button",className:" ui-text-2xl ui-bg-slate-500 ui-font-bold",children:n})};

export { x as a };
