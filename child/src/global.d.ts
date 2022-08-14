declare type Recordable<T = any> = Record<string, T>;
interface ImportMetaEnv extends ViteEnv {
  __: unknown;
}
declare interface ViteEnv {
  VITE_ENV: string;
  VITE_PORT: number;
  VITE_APP_TITLE: string;
  VITE_APP_DEBUG_TOOL: string;
  VITE_BUILD_SOURCEMAP: boolean;
  VITE_BUILD_DROP_CONSOLE: boolean;
  VITE_APP_API_BASEURL: string;
  VITE_APP_API_FILEURL: string;
  VITE_APP_API_BASE_SENDURL: string;
  VITE_APP_MID_API_BASE_URL: string;
  VITE_OPEN_PROXY0: boolean;
  VITE_APP_BASEAPP_URL: string;
  VITE_APP_NTSYS_ID: string;
}
