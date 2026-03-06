import { ref } from 'vue'
import { HOURS_IN_DAY, MIDNIGHT_HOUR } from '@/constants.js'
import { currentHour } from '@/functions.js'

export const timelineItems = ref(generateTimelineItems())
export const timelineItemRefs = ref([])
export function updateTimelineItem(timelineItem, fields){
  return Object.assign(timelineItem, fields)
}

export function resetTimelineItemActivities(timelineItems, activity) {
  filterTimelineItemsByActivity(timelineItems, activity)
    .forEach((timelineItem) => updateTimelineItem(timelineItem,{
      activityId: null,
      activitySeconds: 0
  }))
}

export function calculateTrackedActivitySeconds(timelineItems, activity) {
  return filterTimelineItemsByActivity(timelineItems, activity)
    .map(({ activitySeconds }) => activitySeconds)
    .reduce((total, seconds) => Math.round(total + seconds), 0)
}

export function scrollToHour(hour, isSmooth = true) {
  const options = { behavior: isSmooth ? 'smooth' : 'instant' } // Плавная или резкая прокрутка
  const el = hour === MIDNIGHT_HOUR ? document.body :  timelineItemRefs.value[hour - 2].$el
  el.scrollIntoView(options)
}

export function scrollToCurrentHour(isSmooth = false) {
  scrollToHour(currentHour(), isSmooth)
}

function generateTimelineItems() {
  return [...Array(HOURS_IN_DAY).keys()].map((hour) => ({
    hour,
    activityId: null, //[0,1,2,3,4].includes(hour) ? activities.value[hour % 3].id : null,
    activitySeconds: 0 // [0,1,2,3,4].includes(hour) ? hour * 600 : 0
  }))
}

function filterTimelineItemsByActivity(timelineItems, { id }) {
  return timelineItems.filter(({ activityId }) => activityId === id)
}

