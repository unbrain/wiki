<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  nameFirst?: string
  nameLast?: string
  nameCn?: string
  role?: string
  customClass?: string
}>()

// Check if name should be displayed in Chinese art font
const isChinese = computed(() => {
  if (props.nameCn && /[\u4e00-\u9fa5]/.test(props.nameCn)) {
    return true
  }
  return false
})

const nameLines = computed(() => {
  // If Chinese name is specified, display Chinese name directly without pinyin
  if (isChinese.value && props.nameCn) {
    return [props.nameCn]
  }
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
