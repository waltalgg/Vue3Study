<script setup>
import { ICONS } from '../icons'
import { isIconValid } from '@/validators.js'

defineProps({
  name: {
    required: true,
    type: String,
    validator: isIconValid,
  },
})
</script>

<template>
  <component :is="ICONS[name]" :class="$attrs.class || 'h-8'" />
</template>

<style scoped></style>
