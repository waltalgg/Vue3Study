import { createApp } from 'vue'
import { syncState } from './storage'
import { startCurrentDateTimer } from './time'
import App from './App.vue'
import './main.css'

syncState()

startCurrentDateTimer()

document.addEventListener('visibilitychange', () =>
  syncState(document.visibilityState === 'visible')
)

createApp(App).mount('#app')
