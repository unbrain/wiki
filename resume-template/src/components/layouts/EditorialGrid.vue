<script setup lang="ts">
defineProps<{
  customClass?: string
}>()
</script>

<template>
  <div class="editorial-grid" :class="customClass">
    <div class="grid-col-left">
      <slot name="left"></slot>
    </div>
    <div class="grid-col-right">
      <slot name="right">
        <slot></slot>
      </slot>
    </div>
  </div>
</template>
