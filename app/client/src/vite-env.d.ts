/** Es para elimiar los errores del tipado. Por el momento no se realmente como funciona */
/// <reference types="vite/client" />

// Imágenes
declare module "*.svg" {
  import type * as React from "react";
  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;
  const src: string;
  export default src;
}

declare module "*.png" {
  const src: string;
  export default src;
}
declare module "*.jpg" {
  const src: string;
  export default src;
}
declare module "*.jpeg" {
  const src: string;
  export default src;
}
declare module "*.webp" {
  const src: string;
  export default src;
}
declare module "*.gif" {
  const src: string;
  export default src;
}
declare module "*.ico" {
  const src: string;
  export default src;
}

// Estilos
declare module "*.css" {
  const classes: Record<string, string>;
  export default classes;
}
declare module "*.scss" {
  const classes: Record<string, string>;
  export default classes;
}
declare module "*.module.css" {
  const classes: Record<string, string>;
  export default classes;
}
declare module "*.module.scss" {
  const classes: Record<string, string>;
  export default classes;
}
