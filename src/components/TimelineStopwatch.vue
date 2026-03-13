<script setup>
import { BUTTON_TYPE_DANGER, BUTTON_TYPE_SUCCESS, BUTTON_TYPE_WARNING } from '@/constants.js'
import BaseButton from '@/components/BaseButton.vue'
import { isTimelineItemValid } from '@/validators.js'
import { formatSeconds } from '@/functions.js'
import BaseIcon from '@/components/BaseIcon.vue'
import { ICON_ARROW_PATH, ICON_PAUSE, ICON_PLAY } from '@/icons.js'
import { useStopwatch } from '@/composables/stopwatch.js'
import { updateTimelineItem } from '@/timeline-items.js'
import { onMounted, watch, watchEffect } from 'vue'
import { now } from '@/time.js'

const props = defineProps({
  timelineItem: {
    required: true,
    type: Object,
    validator: isTimelineItemValid,
  },
})

const { seconds, isRunning, start, stop, reset } = useStopwatch(props.timelineItem.activitySeconds)

onMounted(() => {
  if(props.timelineItem.isActive) {
    start()
  }
})

watchEffect(() => {
  if (props.timelineItem.hour !== now.value.getHours() && isRunning.value) {
    stop()
  }
})

watchEffect(() =>
  updateTimelineItem(props.timelineItem, {
    activitySeconds: seconds.value,
  }),
)

watch(isRunning, () =>
  updateTimelineItem(props.timelineItem, {
    isActive: Boolean(isRunning.value),
  }),
)
</script>

<template>
  <div class="flex w-full gap-2">
    <BaseButton :type="BUTTON_TYPE_DANGER" :disabled="!timelineItem.activitySeconds" @click="reset">
      <BaseIcon :name="ICON_ARROW_PATH" />
    </BaseButton>
    <div class="flex flex-grow items-center rounded bg-gray-100 px-2 font-mono text-3xl">
      {{ formatSeconds(timelineItem.activitySeconds) }}
    </div>
    <BaseButton v-if="isRunning" :type="BUTTON_TYPE_WARNING" @click="stop">
      <BaseIcon :name="ICON_PAUSE" />
    </BaseButton>
    <BaseButton
      v-else
      :type="BUTTON_TYPE_SUCCESS"
      :disabled="props.timelineItem.hour !== now.getHours()"
      @click="start"
    >
      <BaseIcon :name="ICON_PLAY" />
    </BaseButton>
  </div>
</template>

<style scoped></style>
