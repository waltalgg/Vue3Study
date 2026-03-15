<script setup>
import TimelineItem from '../components/TimelineItem.vue'
import { onActivated, onDeactivated } from 'vue'
import { timelineItems, timelineItemRefs, scrollToCurrentHour } from '@/timeline-items.js'
import TheTimelineIndicator from '@/components/TheTimelineIndicator.vue'
import { startCurrentDateTimer, stopCurrentDateTimer } from '@/time.js'

onActivated(() => {
  scrollToCurrentHour()
  startCurrentDateTimer()
})

onDeactivated(stopCurrentDateTimer)
</script>

<template>
  <div class="relative mt-10">
    <TheTimelineIndicator />
    <ul>
      <TimelineItem
        v-for="timelineItem in timelineItems"
        :key="timelineItem.hour"
        :timeline-item="timelineItem"
        ref="timelineItemRefs"
      />
    </ul>
  </div>
</template>

<style scoped></style>
