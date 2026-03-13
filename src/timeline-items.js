import { ref } from 'vue'
import { HOURS_IN_DAY, MIDNIGHT_HOUR, MILLISECONDS_IN_SECOND } from '@/constants.js'
import { now } from '@/time.js'

export const timelineItems = ref(generateTimelineItems())
export const timelineItemRefs = ref([])
export function updateTimelineItem(timelineItem, fields){
  return Object.assign(timelineItem, fields)
}

let timelineItemTimer = null

export function startTimelineItemTimer(activeTimelineItem){
  timelineItemTimer = setInterval(() => {
    updateTimelineItem(activeTimelineItem, {
      activitySeconds: activeTimelineItem.activitySeconds + 1
    })
  }, MILLISECONDS_IN_SECOND)
}


export function stopTimelineItemTimer(){
  clearInterval(timelineItemTimer)
}

export function findActiveTimelineItem() {
  return timelineItems.value.find(({ isActive }) => isActive)
}

export function resetTimelineItemActivities(timelineItems, activity) {
  filterTimelineItemsByActivity(timelineItems, activity)
    .forEach((timelineItem) => updateTimelineItem(timelineItem,{
      activityId: null,
      activitySeconds: timelineItem.hour === now.value.getHours() ? timelineItem.activitySeconds : 0,
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
  scrollToHour(now.value.getHours(), isSmooth)
}

function generateTimelineItems() {
  return [...Array(HOURS_IN_DAY).keys()].map((hour) => ({
    hour,
    activityId: null, //[0,1,2,3,4].includes(hour) ? activities.value[hour % 3].id : null,
    activitySeconds: 0, // [0,1,2,3,4].includes(hour) ? hour * 600 : 0,
    isActive: false,
  }))
}

function filterTimelineItemsByActivity(timelineItems, { id }) {
  return timelineItems.filter(({ activityId }) => activityId === id)
}



