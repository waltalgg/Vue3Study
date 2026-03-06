<script setup>
import { computed } from 'vue'
import { calculateActivityCompletePercentage } from '@/activities.js'
import { formatSeconds, getProgressColorClass } from '@/functions.js'
import { calculateTrackedActivitySeconds, timelineItems } from '@/timeline-items.js'
import { isActivityValid } from '@/validators.js'

const props = defineProps({
  activity: {
    required: true,
    type: Object,
    validator: isActivityValid,
  },
})
const percentage = computed(() =>
  calculateActivityCompletePercentage(
    props.activity,
    trackedActivitySeconds.value
  ),
)

const trackedActivitySeconds = computed(() =>
  calculateTrackedActivitySeconds(timelineItems.value, props.activity)
)
</script>

<template>
  <li class="flex flex-col gap-1 p-4">
    <div class="truncate text-xl">{{ activity.name }}</div>
    <div class="flex h-5 overflow-hidden rounded bg-neutral-200">
      <div :class="getProgressColorClass(percentage)" :style="`width: ${percentage}%`" />
    </div>
    <div class="flex justify-between font-mono text-sm">
      <span>{{ percentage }}%</span>
      <span>
        {{ formatSeconds(trackedActivitySeconds) }} /
        {{ formatSeconds(activity.secondsToComplete) }}
      </span>
    </div>
  </li>
</template>

<style scoped></style>
