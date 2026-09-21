/// <reference types="vite/client" />

declare module '*.css' {
  const content: Record<string, string>;
  export default content;
}

declare module '*.jpg';
declare module '*.png';
declare module '*.svg';
declare module '*.webp';
