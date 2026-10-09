<script setup lang="ts">
defineProps<{
  metric: string
  annotation?: string
}>()
</script>

<template>
  <div class="notched-title-badge">
    <div class="badge-metric editable">{{ metric }}</div>
    <div v-if="annotation" class="badge-annotation editable">{{ annotation }}</div>
  </div>
</template>

<style scoped>
.notched-title-badge {
  position: relative;
  background-color: var(--card-black);
  color: #fff;
  padding: 11px 16px 17px 16px;
  clip-path: url(#ref-card-mini-clip);
  -webkit-clip-path: url(#ref-card-mini-clip);
  filter: drop-shadow(0 6px 14px rgba(0, 0, 0, 0.16));
  display: flex;
  flex-direction: column;
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
