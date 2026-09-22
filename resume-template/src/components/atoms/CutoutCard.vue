<script setup lang="ts">
defineProps<{
  title?: string
}>()
</script>

<template>
  <div class="reference-card">
    <div v-if="title" class="ref-title editable">{{ title }}</div>
    <slot name="header"></slot>
    <div class="ref-divider"></div>
    <slot></slot>
    <slot name="footer"></slot>
  </div>
</template>
