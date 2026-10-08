<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  nameFirst?: string
  nameLast?: string
  nameCn?: string
  role?: string
  customClass?: string
}>()

// Check if name should be displayed in Chinese art font (only when no Latin first/last name is provided)
const isChinese = computed(() => {
  if (props.nameFirst && props.nameLast) {
    return false
  }
  return Boolean(props.nameCn && /[\u4e00-\u9fa5]/.test(props.nameCn))
})

const nameLines = computed(() => {
  if (props.nameFirst && props.nameLast) {
    return [props.nameFirst, props.nameLast]
  }
  return [props.nameCn || 'RESUME']
})
</script>

<template>
  <div :class="customClass || 'hero-title-group'">
    <div
      class="hero-name editable"
      :class="{ 'is-chinese-art': isChinese }"
    >
      <template v-for="(line, idx) in nameLines" :key="idx">
        {{ line }}<br v-if="idx < nameLines.length - 1" />
      </template>
    </div>
    <div v-if="role" class="hero-role editable">{{ role }}</div>
  </div>
</template>
