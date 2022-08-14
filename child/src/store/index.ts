import type { App } from 'vue';
import { createPinia } from 'pinia';
import { useAppStore } from './modules/app';
const store = createPinia();

// const pinia = createPinia()

export function setupStore(app: App<Element>) {
  app.use(store);
}
export { store };

export { useAppStore };
// // console.log(useAppStore(), useUserStore())
// export default pinia
