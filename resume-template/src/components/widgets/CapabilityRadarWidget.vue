<script setup lang="ts">
import CutoutCard from '../atoms/CutoutCard.vue'

defineProps<{
  title?: string
  header?: string
  role?: string
  items?: string[]
}>()
</script>

<template>
  <CutoutCard :title="title || 'Capability Radar'">
    <template #header>
      <div v-if="header" class="ref-name editable">{{ header }}</div>
      <div v-if="role" class="ref-role editable">{{ role }}</div>
    </template>

    <div v-for="(line, idx) in items || []" :key="idx" class="ref-line editable">
      {{ line }}
    </div>
  </CutoutCard>
</template>
