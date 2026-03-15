<script setup>
import BaseButton from '@/components/BaseButton.vue'
import { isSelectValueValid, isUndefinedOrNull, validateSelectOptions } from '@/validators.js'
import { computed } from 'vue'
import { BUTTON_TYPE_NEUTRAL } from '@/constants.js'
import { normalizeSelectValue } from '@/functions.js'
import BaseIcon from '@/components/BaseIcon.vue'
import { ICON_X_MARK } from '@/icons.js'

const props = defineProps({
  selected: [Number, String],
  options: {
    required: true,
    type: Array,
    validator: validateSelectOptions,
  },
  placeholder: {
    required: true,
    type: String,
  },
})

const emit = defineEmits({
  select: isSelectValueValid,
})

const isNotSelected = computed(() => isUndefinedOrNull(props.selected))

function select(value) {
  emit('select', normalizeSelectValue(value))
}
</script>

<template>
  <div class="flex gap-2">
    <BaseButton :type="BUTTON_TYPE_NEUTRAL" @click="select(null)">
      <BaseIcon :name="ICON_X_MARK" />
    </BaseButton>
    <select
      class="w-full truncate rounded bg-gray-100 py-1 px-2 text-2xl"
      @change="select($event.target.value)"
    >
      <option :selected="isNotSelected" disabled value="">{{ placeholder }}</option>
      <option
        v-for="{ value, label } in options"
        :key="value"
        :value="value"
        :selected="value === selected"
      >
        {{ label }}
      </option>
    </select>
  </div>
</template>

<style scoped></style>
