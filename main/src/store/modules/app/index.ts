import { defineStore } from 'pinia'
// import piniaStore from '@/store/index
import { store } from '@/store';
import { AppState } from './types'

export const useAppStore = defineStore(
  // 唯一ID
  'app',
  {
    state: () => ({
      title: 'micro-demo',
      h1: '',
      theme: 'dark',
      colorWeek: false,
      navbar: true,
      menu: true,
      menuCollapse: false,
      footer: true,
      themeColor: '#165DFF',
      menuWidth: 220,
      globalSettings: false,
    }),
    getters: {},
    actions: {
      // Update app settings
      updateSettings(partial: Partial<AppState>) {
        // @ts-ignore-next-line
        this.$patch(partial)
      },

      // Change theme color
      toggleTheme(dark: boolean) {
        if (dark) {
          this.theme = 'dark'
          document.documentElement.classList.add('dark')
          document.body.setAttribute('arco-theme', 'dark')
        } else {
          this.theme = 'light'
          document.documentElement.classList.remove('dark')
          document.body.removeAttribute('arco-theme')
        }
      },
    },
  },
)

// Need to be used outside the setup
export function useAppOutsideStore() {
  return useAppStore(store);
}

// export function useAppOutsideStore() {
//   return useAppStore(piniaStore)
// }

// export default useAppStore
