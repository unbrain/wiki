<script setup lang="ts">
defineProps<{
  metric: string
  annotation?: string
  category?: string
}>()
</script>

<template>
  <div class="notched-title-badge">
    <div v-if="category" class="badge-category editable">{{ category }}</div>
    <div v-if="category" class="badge-divider"></div>
    <div class="badge-metric editable">{{ metric }}</div>
    <div v-if="annotation" class="badge-annotation editable">{{ annotation }}</div>
  </div>
</template>

<style scoped>
.notched-title-badge {
  position: relative;
  background-color: var(--card-black);
  color: #fff;
  padding: 12px 16px 18px 16px;
  clip-path: url(#ref-card-clip);
  -webkit-clip-path: url(#ref-card-clip);
  filter: drop-shadow(0 6px 14px rgba(0, 0, 0, 0.16));
  display: flex;
  flex-direction: column;
}

.badge-category {
  font-size: 9.5px;
  font-weight: 800;
  color: #8c9890;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  line-height: 1;
  margin-bottom: 5px;
}

.badge-divider {
  width: 100%;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.18);
  margin-bottom: 7px;
}

.badge-metric {
  font-size: 13px;
  font-weight: 800;
  color: #ffffff;
  line-height: 1.35;
  letter-spacing: 0.02em;
}

.badge-annotation {
  font-size: 9.8px;
  font-weight: 500;
  color: #9ea9a1;
  line-height: 1.35;
  margin-top: 3px;
  letter-spacing: 0.015em;
}
</style>
