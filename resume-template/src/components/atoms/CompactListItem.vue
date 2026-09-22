<script setup lang="ts">
defineProps<{
  primary: string
  secondary?: string
  meta?: string
}>()
</script>

<template>
  <div class="list-item">
    <div class="item-primary">
      <span class="sq-bullet"></span>
      <span class="editable">{{ primary }}</span>
    </div>
    <div v-if="secondary" class="item-secondary editable">{{ secondary }}</div>
    <div v-if="meta" class="item-meta editable">{{ meta }}</div>
  </div>
</template>
