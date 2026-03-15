<script setup>
import { BUTTON_TYPE_DANGER, BUTTON_TYPE_SUCCESS, BUTTON_TYPE_WARNING } from '@/constants.js'
import BaseButton from '@/components/BaseButton.vue'
import { isTimelineItemValid } from '@/validators.js'
import { formatSeconds } from '@/functions.js'
import BaseIcon from '@/components/BaseIcon.vue'
import { ICON_ARROW_PATH, ICON_PAUSE, ICON_PLAY } from '@/icons.js'
import { now } from '@/time.js'
import {
  resetTimelineItemTimer,
  startTimelineItemTimer,
  stopTimelineItemTimer,
} from '@/timeline-item-timer.js'
import { activeTimelineItem } from '@/timeline-items.js'

defineProps({
  timelineItem: {
    required: true,
    type: Object,
    validator: isTimelineItemValid,
  },
})
</script>

<template>
  <div class="flex w-full gap-2">
    <BaseButton
      :type="BUTTON_TYPE_DANGER"
      :disabled="!timelineItem.activitySeconds"
      @click="resetTimelineItemTimer(timelineItem)"
    >
      <BaseIcon :name="ICON_ARROW_PATH" />
    </BaseButton>
    <div class="flex flex-grow items-center rounded bg-gray-100 px-2 font-mono text-3xl">
      {{ formatSeconds(timelineItem.activitySeconds) }}
    </div>
    <BaseButton
      v-if="timelineItem === activeTimelineItem"
      :type="BUTTON_TYPE_WARNING"
      @click="($event) => stopTimelineItemTimer"
    >
      <BaseIcon :name="ICON_PAUSE" />
    </BaseButton>
    <BaseButton
      v-else
      :type="BUTTON_TYPE_SUCCESS"
      :disabled="timelineItem.hour !== now.getHours()"
      @click="startTimelineItemTimer(timelineItem)"
    >
      <BaseIcon :name="ICON_PLAY" />
    </BaseButton>
  </div>
</template>

<style scoped></style>
