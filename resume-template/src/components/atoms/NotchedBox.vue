<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'

const props = withDefaults(
  defineProps<{
    radius?: number
    background?: string
    customClass?: string
  }>(),
  {
    radius: 8,
    background: 'var(--card-black)'
  }
)

const containerRef = ref<HTMLElement | null>(null)
// Default fallback values matching standard sidebar column width & badge height
const width = ref(236)
const height = ref(52)

function updateDimensions() {
  if (containerRef.value) {
    const rect = containerRef.value.getBoundingClientRect()
    if (rect.width > 0) width.value = Math.round(rect.width)
    if (rect.height > 0) height.value = Math.round(rect.height)
  }
}

let resizeObserver: ResizeObserver | null = null

onMounted(() => {
  updateDimensions()
  if (typeof ResizeObserver !== 'undefined' && containerRef.value) {
    resizeObserver = new ResizeObserver(() => {
      updateDimensions()
    })
    resizeObserver.observe(containerRef.value)
  }
})

onUnmounted(() => {
  resizeObserver?.disconnect()
})

const pathD = computed(() => {
  const w = width.value
  const h = height.value
  const r = props.radius

  // Calibrate notch step height and shelf position
  const notchH = Math.min(18, Math.max(12, h * 0.28))
  const shelfY = h - notchH

  const shelfStartX = w - 8
  const shelfEndX = Math.max(w - 55, w * 0.72)
  const bottomX = Math.max(w - 85, w * 0.58)

  // Two bezier segments for the smooth S-curve notch
  const cp1x = shelfEndX - 7
  const cp1y = shelfY
  const cp2x = shelfEndX - 12
  const cp2y = shelfY + notchH * 0.35
  const p1x = shelfEndX - 14
  const p1y = shelfY + notchH * 0.55

  const cp3x = shelfEndX - 16
  const cp3y = shelfY + notchH * 0.75
  const cp4x = bottomX + 10
  const cp4y = h

  return [
    `M ${r} 0`,
    `L ${w - r} 0`,
    `A ${r} ${r} 0 0 1 ${w} ${r}`,
    `L ${w} ${(shelfY - 6).toFixed(1)}`,
    `A 6 6 0 0 1 ${shelfStartX} ${shelfY.toFixed(1)}`,
    `L ${shelfEndX.toFixed(1)} ${shelfY.toFixed(1)}`,
    `C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p1x.toFixed(1)} ${p1y.toFixed(1)}`,
    `C ${cp3x.toFixed(1)} ${cp3y.toFixed(1)}, ${cp4x.toFixed(1)} ${cp4y.toFixed(1)}, ${bottomX.toFixed(1)} ${h}`,
    `L ${r} ${h}`,
    `A ${r} ${r} 0 0 1 0 ${h - r}`,
    `L 0 ${r}`,
    `A ${r} ${r} 0 0 1 ${r} 0`,
    'Z'
  ].join(' ')
})
</script>

<template>
  <div ref="containerRef" :class="['notched-box', customClass]">
    <svg
      class="notched-svg-bg"
      :width="width"
      :height="height"
      :viewBox="`0 0 ${width} ${height}`"
      aria-hidden="true"
    >
      <path :d="pathD" :fill="background" />
    </svg>
    <div class="notched-body">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.notched-box {
  position: relative;
  display: block;
  filter: drop-shadow(0 6px 14px rgba(0, 0, 0, 0.16));
}

.notched-svg-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  overflow: visible;
}

.notched-body {
  position: relative;
  z-index: 1;
  color: #fff;
  padding: 11px 16px 17px 16px;
}
</style>
