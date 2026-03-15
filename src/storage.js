import { APP_NAME } from '@/constants.js'
import { today } from '@/time.js'
import { activities, initializeActivities } from '@/activities.js'
import { activeTimelineItem, initializeTimelineItems, timelineItems } from '@/timeline-items.js'
import { startTimelineItemTimer, stopTimelineItemTimer } from '@/timeline-item-timer.js'

export function loadState() {
  const state = loadFromLocalStorage()
  initializeActivities(state)
  initializeTimelineItems(state)
}
export function saveState() {
  localStorage.setItem(
    APP_NAME,
    JSON.stringify({
      timelineItems: timelineItems.value,
      activities: activities.value,
      lastActiveAt: today(),
    }),
  )
}

export function syncState(shouldLoad = true) {
  shouldLoad ? loadState() : saveState()
  if (activeTimelineItem.value) {
    shouldLoad ? startTimelineItemTimer() : stopTimelineItemTimer()
  }
}

function loadFromLocalStorage() {
  return JSON.parse(localStorage.getItem(APP_NAME) ?? '{}')
}
