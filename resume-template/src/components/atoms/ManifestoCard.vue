<script setup lang="ts">
defineProps<{
  title?: string
  quote?: string
}>()
</script>

<template>
  <div v-if="quote" class="manifesto-box">
    <div v-if="title" class="m-title editable">{{ title }}</div>
    <div class="m-quote editable">{{ quote }}</div>
  </div>
</template>
