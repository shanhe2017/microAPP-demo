declare type Recordable<T = any> = Record<string, T>;
interface ImportMetaEnv extends ViteEnv {
  __: unknown;
}
declare interface ViteEnv {
  NODE_ENV: string;
  VITE_PORT: number;
  VITE_APP_TITLE: string;
  VITE_APP_DEBUG_TOOL: string;
  VITE_BUILD_SOURCEMAP: boolean;
  VITE_BUILD_DROP_CONSOLE: boolean;
  VITE_APP_API_BASEURL: string;
  VITE_APP_API_FILEURL: string;
  VITE_APP_API_BASE_SENDURL: string;
  VITE_APP_MID_API_BASE_URL: string;
  VITE_GLOB_OPENIM_API_URL: string;
  VITE_GLOB_OPEN_API_URL: string;
  VITE_GLOB_OPENBASE_API_URL: string;
  VITE_OPEN_PROXY0: boolean;
  VITE_OPEN_SERRECT_KEY: string;
  VITE_APP_RSA_PUBLIC_KEY: string;
}
