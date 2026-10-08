<script setup lang="ts">
import type { CVExperience } from '../../types/cv'

export interface TimelineItemData {
  title: string
  company?: string
  subtitle?: string
  summary?: string
  bullets?: string[]
}

defineProps<{
  item: CVExperience | TimelineItemData
  hideHeader?: boolean
}>()
</script>

<template>
  <div class="job-item" :class="{ 'no-header': hideHeader }">
    <div v-if="!hideHeader" class="job-header">
      <span class="sq-bullet"></span>
      <span class="editable">{{ item.title }}</span>
    </div>
    <div v-if="item.company" class="job-company editable">
      <span v-if="hideHeader" class="sq-bullet"></span>
      <span>{{ item.company }}</span>
    </div>
    <div v-if="item.subtitle" class="job-subtitle editable">{{ item.subtitle }}</div>
    <div v-if="item.summary" class="job-summary editable">{{ item.summary }}</div>
    <ul v-if="item.bullets && item.bullets.length" class="job-bullets editable">
      <li v-for="(bullet, idx) in item.bullets" :key="idx">
        <span class="tri-bullet">▸</span>
        <span>{{ bullet }}</span>
      </li>
    </ul>
  </div>
</template>
