import { createApp } from 'vue'
import App from './App.vue'
import './main.css'
import { syncState } from './storage'

syncState()

document.addEventListener('visibilitychange', () =>
  syncState(document.visibilityState === 'visible'),
)

createApp(App).mount('#app')
