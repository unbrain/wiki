import { ref, onMounted, onUnmounted, watch, type Ref } from 'vue'

export type ViewMode = 'grid' | 'vertical' | 'single'

export function useViewControls(totalPages: Ref<number>) {
  const viewMode = ref<ViewMode>('grid')
  const targetPage = ref<number>(1)
  const zoom = ref<number>(80)

  // Auto-fit initial zoom based on screen width
  if (typeof window !== 'undefined') {
    if (window.innerWidth < 1100) zoom.value = 52
    else if (window.innerWidth < 1440) zoom.value = 70
    else zoom.value = 80
  }

  function setViewMode(mode: ViewMode, page: number = 1) {
    viewMode.value = mode
    targetPage.value = page
    if (mode === 'single') {
      window.location.hash = `#p${page}`
    } else if (mode === 'grid') {
      window.location.hash = '#grid'
    } else if (mode === 'vertical') {
      window.location.hash = '#vertical'
    }
  }

  function handleHash() {
    const hash = window.location.hash.toLowerCase()
    const pMatch = hash.match(/^#p(\d+)$/)
    if (pMatch) {
      const pNum = parseInt(pMatch[1], 10)
      if (pNum >= 1 && pNum <= totalPages.value) {
        viewMode.value = 'single'
        targetPage.value = pNum
      } else {
        viewMode.value = 'single'
        targetPage.value = 1
      }
    } else if (hash === '#vertical') {
      viewMode.value = 'vertical'
    } else if (hash === '#grid' || !hash) {
      viewMode.value = 'grid'
    }
  }

  // Guard against out-of-bound targetPage when totalPages changes
  watch(totalPages, (newTotal) => {
    if (targetPage.value > newTotal) {
      targetPage.value = newTotal
      if (viewMode.value === 'single') {
        window.location.hash = `#p${newTotal}`
      }
    }
  })

  function triggerPrint() {
    window.print()
  }

  onMounted(() => {
    handleHash()
    window.addEventListener('hashchange', handleHash)
  })

  onUnmounted(() => {
    window.removeEventListener('hashchange', handleHash)
  })

  return {
    viewMode,
    targetPage,
    zoom,
    setViewMode,
    triggerPrint
  }
}
