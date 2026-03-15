<script setup>
import BaseSelect from '@/components/BaseSelect.vue'
import TimelineHour from '@/components/TimelineHour.vue'
import { isTimelineItemValid } from '@/validators.js'
import TimelineStopwatch from '@/components/TimelineStopwatch.vue'
import { activitySelectOptions } from '@/activities.js'
import { updateTimelineItem } from '@/timeline-items.js'

defineProps({
  timelineItem: {
    required: true,
    type: Object,
    validator: isTimelineItemValid,
  },
})
</script>

<template>
  <li class="relative flex flex-col gap-2 border-t border-gray-200 py-10 px-4">
    <TimelineHour :hour="timelineItem.hour" />
    <BaseSelect
      placeholder="Rest"
      :selected="timelineItem.activityId"
      :options="activitySelectOptions"
      @select="updateTimelineItem(timelineItem, { activityId: $event })"
    />
    <TimelineStopwatch :timeline-item="timelineItem" />
  </li>
</template>

<style scoped></style>
