<script setup lang="ts">
import { watch, nextTick, ref } from 'vue'
import './assets/css/editorial.css'
import SvgDefs from './components/SvgDefs.vue'
import TopToolbar from './components/TopToolbar.vue'
import PageCover from './components/pages/PageCover.vue'
import PageSkillsExperience from './components/pages/PageSkillsExperience.vue'
import PageProjects from './components/pages/PageProjects.vue'
import PageCoverLetter from './components/pages/PageCoverLetter.vue'
import { useResume } from './composables/useResume'
import { usePagination } from './composables/usePagination'
import { useViewControls } from './composables/useViewControls'

const {
  activePresetKey,
  cv,
  isEditing,
  toast,
  loadPreset,
  importJson,
  exportJson,
  replacePhoto,
  toggleEdit,
  resetToPresetDefaults
} = useResume()

const { pages, totalPages } = usePagination(cv)
const { viewMode, targetPage, zoom, setViewMode, triggerPrint } = useViewControls(totalPages)

const photoInputRef = ref<HTMLInputElement | null>(null)

function onPhotoFileChange(e: Event) {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    replacePhoto(file)
    target.value = ''
  }
}

// Watch isEditing to sync contenteditable attribute on .editable elements
watch(isEditing, async (newVal) => {
  await nextTick()
  document.querySelectorAll('.editable').forEach((el) => {
    el.setAttribute('contenteditable', newVal ? 'true' : 'false')
  })
})
</script>

<template>
  <div :class="{ 'is-editing': isEditing }">
    <!-- SVG Vector Clip Paths -->
    <SvgDefs />

    <!-- Hidden Photo Input for clicking photo on Page 1 -->
    <input
      ref="photoInputRef"
      type="file"
      class="hidden-input"
      accept="image/*"
      @change="onPhotoFileChange"
    />

    <!-- Toast Notification -->
    <div class="toast-notice" :class="{ show: Boolean(toast) }">
      {{ toast }}
    </div>

    <!-- Top Sticky Toolbar -->
    <TopToolbar
      :active-preset-key="activePresetKey"
      :is-editing="isEditing"
      :total-pages="totalPages"
      :pages="pages"
      :view-mode="viewMode"
      :target-page="targetPage"
      :zoom="zoom"
      @change-preset="loadPreset"
      @toggle-edit="toggleEdit"
      @export-json="exportJson"
      @import-json="importJson"
      @replace-photo="replacePhoto"
      @set-view-mode="setViewMode"
      @update:zoom="zoom = $event"
      @reset-defaults="resetToPresetDefaults"
      @print="triggerPrint"
    />

    <!-- Workspace / Desk Stage -->
    <main class="desk-stage">
      <div
        class="pages-container"
        :class="{
          'layout-grid': viewMode === 'grid',
          'layout-vertical': viewMode === 'vertical',
          'layout-single': viewMode === 'single'
        }"
        :style="{ transform: `scale(${zoom / 100})` }"
      >
        <!-- Declarative Page Rendering Pipeline -->
        <template v-for="page in pages" :key="page.id">
          <!-- Page 1: Cover -->
          <PageCover
            v-if="page.type === 'cover'"
            :cv="cv"
            :active="viewMode === 'single' && targetPage === page.pageNumber"
            @replace-photo="photoInputRef?.click()"
          />

          <!-- Page 2: Skills & Architecture (or Work Experience) -->
          <PageSkillsExperience
            v-else-if="page.type === 'skills'"
            :cv="cv"
            :active="viewMode === 'single' && targetPage === page.pageNumber"
          />

          <!-- Page 3+: Dynamic Project Pages with Chunking -->
          <PageProjects
            v-else-if="page.type === 'projects'"
            :cv="cv"
            :chunk="page.projectChunk || []"
            :chunk-index="page.chunkIndex || 0"
            :total-chunks="page.totalChunks || 1"
            :page-num="page.pageNumber"
            :active="viewMode === 'single' && targetPage === page.pageNumber"
          />

          <!-- Final Page: Cover Letter -->
          <PageCoverLetter
            v-else-if="page.type === 'letter'"
            :cv="cv"
            :page-num="page.pageNumber"
            :active="viewMode === 'single' && targetPage === page.pageNumber"
          />
        </template>
      </div>
    </main>
  </div>
</template>

<style>
/* App-level Layout & Toast */
.desk-stage {
  min-height: calc(100vh - 54px);
  padding: 48px 32px 80px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  overflow-x: auto;
}

.pages-container {
  display: flex;
  gap: 48px;
  transform-origin: top center;
  transition: transform 0.2s ease, gap 0.2s ease;
}

.pages-container.layout-grid {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}

.pages-container.layout-vertical {
  flex-direction: column;
  align-items: center;
  gap: 56px;
}

.pages-container.layout-single .a4-page {
  display: none !important;
}
.pages-container.layout-single .a4-page.current-active {
  display: flex !important;
}

.toast-notice {
  position: fixed;
  bottom: 24px;
  right: 24px;
  background: rgba(18, 20, 19, 0.95);
  color: #fff;
  padding: 10px 18px;
  border-radius: 8px;
  font-size: 13px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  z-index: 9999;
  opacity: 0;
  pointer-events: none;
  transform: translateY(12px);
  transition: opacity 0.25s, transform 0.25s;
  border: 1px solid rgba(255, 255, 255, 0.15);
}
.toast-notice.show {
  opacity: 1;
  pointer-events: auto;
  transform: translateY(0);
}

.is-editing [contenteditable="true"] {
  outline: 1px dashed rgba(59, 101, 118, 0.5);
  background: rgba(59, 101, 118, 0.05);
  cursor: text;
}
.is-editing [contenteditable="true"]:hover {
  outline: 2px solid #3b6576;
  background: rgba(59, 101, 118, 0.1);
}

.hidden-input {
  display: none;
}
</style>
