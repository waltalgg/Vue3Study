<script setup>
import { currentPage, navigate } from '@/router.js'
import { isNavItemValid } from '@/validators.js'
import { computed } from 'vue'
import BaseIcon from '@/components/BaseIcon.vue'
import { PAGE_TIMELINE } from '@/constants.js'
import { scrollToCurrentHour } from '@/timeline-items.js'

const props = defineProps({
  navItem: {
    required: true,
    type: Object,
    validator: isNavItemValid,
  },
})

const classes = computed(() => [
  'flex flex-col items-center p-2 text-xs capitalize',
  { 'bg-gray-200': props.navItem.page === currentPage.value },
])

function handleClick() {
  return (currentPage.value === PAGE_TIMELINE && props.navItem.page === PAGE_TIMELINE)
    ? scrollToCurrentHour(true)
    : navigate(props.navItem.page)
}
</script>

<template>
  <li class="flex-1">
    <a v-bind="$attrs" :href="`#${navItem.page}`" :class="classes" @click="handleClick">
      <BaseIcon :name="navItem.icon" class="h-6 w-6" /> {{ navItem.page }}
    </a>
  </li>
</template>

<style scoped></style>
