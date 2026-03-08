import { computed, ref } from 'vue'
import { id } from '@/functions.js'
import { HUNDRED_PERCENT } from '@/constants.js'

export const activities = ref(generateActivities())
export const trackedActivities = computed(() =>
  activities.value.filter(({ secondsToComplete }) => secondsToComplete)
)
export const activitySelectOptions = computed(() => generateActivitySelectOptions(activities.value))

export function createActivity(activity) {
  activities.value.push(activity)
}
export function deleteActivity(activity) {
  activities.value.splice(activities.value.indexOf(activity), 1)
}

export function updateActivity(activity, fields) {
  return Object.assign(activity, fields)
}

export function calculateActivityCompletePercentage({ secondsToComplete },  trackedSeconds) {
  return (trackedSeconds * HUNDRED_PERCENT / secondsToComplete).toFixed()
}

export function calculateCompletionPercentage(totalTrackedSeconds) {
  return (totalTrackedSeconds * HUNDRED_PERCENT / totalActivitySecondsToComplete.value).toFixed()
}


function generateActivities(){
  return ['Coding', 'Training', 'Reading'].map((name, hours) => ({
    id: id(),
    name,
    secondsToComplete: 15 * 60 // hours * SECONDS_IN_HOUR,
  }))
}

function generateActivitySelectOptions(activities){
  return activities.map((activity) => ({ label: activity.name, value: activity.id}))
}

const totalActivitySecondsToComplete = computed(() => {
  return trackedActivities.value
    .map(( { secondsToComplete }) => secondsToComplete)
    .reduce((total, seconds) => total + seconds, 0)
})

