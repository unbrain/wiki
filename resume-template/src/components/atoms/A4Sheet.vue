<script setup lang="ts">
defineProps<{
  pageId?: string
  pageNum?: number
  tagText?: string
  active?: boolean
}>()
</script>

<template>
  <section
    :id="pageId"
    class="a4-page"
    :class="{ 'current-active': active }"
    :data-page="pageNum"
  >
    <div v-if="tagText" class="page-indicator-tag">{{ tagText }}</div>
    <slot></slot>
  </section>
</template>
