<script setup lang="ts">
defineProps<{
  text?: string
}>()
</script>

<template>
  <div class="pill-badge editable">
    <slot>{{ text }}</slot>
  </div>
</template>
