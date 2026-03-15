import { computed, ref } from 'vue'
import { HOURS_IN_DAY, MIDNIGHT_HOUR } from '@/constants.js'
import { endOfHour, isToday, today, toSeconds } from '@/time.js'

export const timelineItems = ref([])
export const timelineItemRefs = ref([])
export function updateTimelineItem(timelineItem, fields) {
  return Object.assign(timelineItem, fields)
}
export const activeTimelineItem = computed(() =>
  timelineItems.value.find(({ isActive }) => isActive),
)

export function resetTimelineItemActivities(timelineItems, activity) {
  filterTimelineItemsByActivity(timelineItems, activity).forEach((timelineItem) =>
    updateTimelineItem(timelineItem, {
      activityId: null,
      activitySeconds: timelineItem.hour === today().getHours() ? timelineItem.activitySeconds : 0,
    }),
  )
}

function resetTimelineItems() {
  timelineItems.value.forEach((timelineItem) =>
    updateTimelineItem(timelineItem, {
      activitySeconds: 0,
      isActive: false,
    }),
  )
}

export function calculateTrackedActivitySeconds(timelineItems, activity) {
  return filterTimelineItemsByActivity(timelineItems, activity)
    .map(({ activitySeconds }) => activitySeconds)
    .reduce((total, seconds) => Math.round(total + seconds), 0)
}

export function scrollToHour(hour, isSmooth = true) {
  const options = { behavior: isSmooth ? 'smooth' : 'instant' } // Плавная или резкая прокрутка
  const el = hour === MIDNIGHT_HOUR ? document.body : timelineItemRefs.value[hour - 2].$el
  el.scrollIntoView(options)
}

export function scrollToCurrentHour(isSmooth = false) {
  scrollToHour(today().getHours(), isSmooth)
}

export function initializeTimelineItems(state) {
  const lastActiveAt = new Date(state.lastActiveAt)
  timelineItems.value = state.timelineItems ?? generateTimelineItems()

  if (activeTimelineItem.value && isToday(lastActiveAt)) {
    syncIdleSeconds(lastActiveAt)
  } else if (state.timelineItems && !isToday(lastActiveAt)) {
    resetTimelineItems()
  }
}

function syncIdleSeconds(lastActiveAt) {
  updateTimelineItem(activeTimelineItem.value, {
    activitySeconds: activeTimelineItem.value.activitySeconds + calculateIdleSeconds(lastActiveAt),
  })
}

function calculateIdleSeconds(lastActiveAt) {
  return lastActiveAt.getHours() === today().getHours()
    ? toSeconds(today() - lastActiveAt)
    : toSeconds(endOfHour(lastActiveAt) - lastActiveAt)
}

function generateTimelineItems() {
  return [...Array(HOURS_IN_DAY).keys()].map((hour) => ({
    hour,
    activityId: null,
    activitySeconds: 0,
    isActive: false,
  }))
}

function filterTimelineItemsByActivity(timelineItems, { id }) {
  return timelineItems.filter(({ activityId }) => activityId === id)
}
