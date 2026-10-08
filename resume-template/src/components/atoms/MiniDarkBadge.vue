<script setup lang="ts">
defineProps<{
  metric: string
  annotation?: string
}>()
</script>

<template>
  <div class="mini-dark-badge">
    <div class="badge-metric editable">{{ metric }}</div>
    <div v-if="annotation" class="badge-annotation editable">{{ annotation }}</div>
  </div>
</template>

<style scoped>
.mini-dark-badge {
  position: relative;
  background-color: var(--card-black);
  color: #fff;
  padding: 10px 14px 11px 14px;
  border-radius: 4px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
  margin-bottom: 12px;
  border-left: 3.5px solid #3b6576;
}

.badge-metric {
  font-size: 12.5px;
  font-weight: 800;
  color: #ffffff;
  line-height: 1.35;
  letter-spacing: 0.02em;
}

.badge-annotation {
  font-size: 9.8px;
  color: #a4aea7;
  line-height: 1.35;
  margin-top: 3px;
  letter-spacing: 0.015em;
}
</style>
