import { createApp } from 'vue'
import App from './App.vue'
import './main.css'
import { loadState, saveState } from './storage'
import { findActiveTimelineItem, startTimelineItemTimer } from '@/timeline-items.js'

loadState()

const activeTimelineItem = findActiveTimelineItem()

if (activeTimelineItem) {
  startTimelineItemTimer(activeTimelineItem)
}

document.addEventListener('visibilitychange', () =>
  document.visibilityState === 'visible' ? loadState() : saveState()
)

createApp(App).mount('#app')
