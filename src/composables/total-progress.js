import { calculateTrackedActivitySeconds, timelineItems } from '@/timeline-items.js'
import { calculateCompletionPercentage, trackedActivities } from '@/activities.js'
import { getProgressColorClass } from '@/functions.js'
import { computed } from 'vue'

export function useTotalProgress() {
  const colorClass = computed(() => getProgressColorClass(percentage.value))

  const percentage = computed(() => calculateCompletionPercentage(totalTrackedSeconds.value))

  const totalTrackedSeconds = computed(() => {
    return trackedActivities.value.reduce((total, activity) => {
      let trackedSeconds = calculateTrackedActivitySeconds(timelineItems.value, activity)
      trackedSeconds =
        trackedSeconds < activity.secondsToComplete ? trackedSeconds : activity.secondsToComplete
      return total + trackedSeconds
    }, 0)
  })

  return {
    colorClass,
    percentage,
  }
}
