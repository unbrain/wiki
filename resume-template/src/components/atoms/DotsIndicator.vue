<script setup lang="ts">
withDefaults(
  defineProps<{
    pattern?: ('filled' | 'outline')[]
  }>(),
  {
    pattern: () => ['outline', 'filled', 'outline']
  }
)
</script>

<template>
  <div class="dots-indicator">
    <span
      v-for="(type, idx) in pattern"
      :key="idx"
      :class="['dot', type === 'filled' ? 'dot-filled' : 'dot-outline']"
    ></span>
  </div>
</template>
