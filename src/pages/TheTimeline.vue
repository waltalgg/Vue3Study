<script setup>
import TimelineItem from '../components/TimelineItem.vue'
import { nextTick, watchPostEffect } from 'vue'
import { PAGE_TIMELINE } from '@/constants.js'
import { currentPage } from '@/router.js'
import {
  scrollToHour,
  timelineItems,
  timelineItemRefs,
  scrollToCurrentHour,
} from '@/timeline-items.js'

watchPostEffect(async () => {
  if (currentPage.value === PAGE_TIMELINE) {
    await nextTick()
    scrollToCurrentHour(false)
  }
})
</script>

<template>
  <div class="mt-10">
    <ul>
      <TimelineItem
        v-for="timelineItem in timelineItems"
        :key="timelineItem.hour"
        :timeline-item="timelineItem"
        ref="timelineItemRefs"
        @scroll-to-hour="scrollToHour(timelineItem.hour)"
      />
    </ul>
  </div>
</template>

<style scoped></style>
