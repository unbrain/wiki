<script setup lang="ts">
import NotchedBox from './NotchedBox.vue'

defineProps<{
  metric: string
  annotation?: string
}>()
</script>

<template>
  <NotchedBox custom-class="notched-title-badge">
    <div class="badge-metric editable">{{ metric }}</div>
    <div v-if="annotation" class="badge-annotation editable">{{ annotation }}</div>
  </NotchedBox>
</template>

<style scoped>
.notched-title-badge {
  display: block;
}

.badge-metric {
  font-size: 13.2px;
  font-weight: 800;
  color: #ffffff;
  line-height: 1.35;
  letter-spacing: 0.02em;
}

.badge-annotation {
  font-size: 10px;
  font-weight: 500;
  color: #9ea9a1;
  line-height: 1.35;
  margin-top: 3px;
  letter-spacing: 0.015em;
}
</style>
