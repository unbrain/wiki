<script setup lang="ts">
import { ref } from 'vue'
import type { PageDescriptor } from '../composables/usePagination'
import type { ViewMode } from '../composables/useViewControls'

const props = defineProps<{
  activePresetKey: string
  isEditing: boolean
  totalPages: number
  pages: PageDescriptor[]
  viewMode: ViewMode
  targetPage: number
  zoom: number
}>()

const emit = defineEmits<{
  (e: 'change-preset', key: string): void
  (e: 'toggle-edit'): void
  (e: 'export-json'): void
  (e: 'import-json', file: File): void
  (e: 'replace-photo', file: File): void
  (e: 'set-view-mode', mode: ViewMode, page?: number): void
  (e: 'update:zoom', val: number): void
  (e: 'reset-defaults'): void
  (e: 'print'): void
}>()

const jsonInputRef = ref<HTMLInputElement | null>(null)
const photoInputRef = ref<HTMLInputElement | null>(null)

function onJsonFileChange(e: Event) {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    emit('import-json', file)
    target.value = ''
  }
}

function onPhotoFileChange(e: Event) {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    emit('replace-photo', file)
    target.value = ''
  }
}
</script>

<template>
  <header class="top-toolbar">
    <!-- Hidden Inputs -->
    <input
      ref="jsonInputRef"
      type="file"
      class="hidden-input"
      accept=".json"
      @change="onJsonFileChange"
    />
    <input
      ref="photoInputRef"
      type="file"
      class="hidden-input"
      accept="image/*"
      @change="onPhotoFileChange"
    />

    <!-- Left Controls -->
    <div class="toolbar-left">
      <div class="toolbar-brand">
        <span>Editorial Resume</span>
        <span class="badge" id="page-count-badge">{{ totalPages }}x A4</span>
      </div>

      <!-- Dataset Selector -->
      <select
        :value="activePresetKey"
        class="tb-select"
        title="Switch dataset"
        @change="emit('change-preset', ($event.target as HTMLSelectElement).value)"
      >
        <option value="unbrain_full">✨ 当前项目完整版: 刘朝阳 (标杆工程全景档案)</option>
        <option value="original"> Jane Wilkins (原版设计稿 · 3 页英文标准版)</option>
      </select>

      <button
        type="button"
        class="tb-btn"
        :class="{ active: isEditing }"
        title="Click any text on page to edit directly"
        @click="emit('toggle-edit')"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 20h9"/>
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
        </svg>
        <span>{{ isEditing ? '完成编辑' : '在线编辑' }}</span>
      </button>

      <button
        type="button"
        class="tb-btn"
        title="Export current data as JSON"
        @click="emit('export-json')"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="7 10 12 15 17 10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
        <span>导出 JSON</span>
      </button>

      <button
        type="button"
        class="tb-btn"
        title="Import JSON data (supports native and rxresu.me formats)"
        @click="jsonInputRef?.click()"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="17 8 12 3 7 8"/>
          <line x1="12" y1="3" x2="12" y2="15"/>
        </svg>
        <span>导入 JSON</span>
      </button>

      <button
        type="button"
        class="tb-btn"
        title="Replace cover photo"
        @click="photoInputRef?.click()"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
          <circle cx="8.5" cy="8.5" r="1.5"/>
          <polyline points="21 15 16 10 5 21"/>
        </svg>
        <span>更换照片</span>
      </button>
    </div>

    <!-- Center Navigation & Layout Toggles -->
    <div class="toolbar-center">
      <div style="display: flex; gap: 4px; background: rgba(0,0,0,0.3); padding: 3px; border-radius: 6px;" id="nav-btn-group">
        <button
          type="button"
          class="tb-btn"
          :class="{ active: viewMode === 'grid' }"
          @click="emit('set-view-mode', 'grid')"
        >
          All Pages
        </button>
        <button
          type="button"
          class="tb-btn"
          :class="{ active: viewMode === 'vertical' }"
          @click="emit('set-view-mode', 'vertical')"
        >
          Vertical
        </button>
        
        <!-- Dynamically generated page buttons based on computed totalPages -->
        <span id="page-num-toggles" style="display: flex; gap: 4px;">
          <button
            v-for="page in pages"
            :key="page.id"
            type="button"
            class="tb-btn"
            :class="{ active: viewMode === 'single' && targetPage === page.pageNumber }"
            @click="emit('set-view-mode', 'single', page.pageNumber)"
          >
            P{{ page.pageNumber }}
          </button>
        </span>
      </div>

      <div class="zoom-control">
        <span>Zoom:</span>
        <input
          type="range"
          min="40"
          max="130"
          :value="zoom"
          @input="emit('update:zoom', Number(($event.target as HTMLInputElement).value))"
        />
        <span>{{ zoom }}%</span>
      </div>
    </div>

    <!-- Right Controls -->
    <div class="toolbar-right">
      <button
        type="button"
        class="tb-btn"
        title="Restore current preset defaults"
        @click="emit('reset-defaults')"
      >
        Reset
      </button>
      
      <button
        type="button"
        class="tb-btn btn-primary"
        title="Print or save as standard multi-page A4 PDF"
        @click="emit('print')"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="6 9 6 2 18 2 18 9"/>
          <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
          <rect x="6" y="14" width="12" height="8"/>
        </svg>
        <span>Print / Save PDF</span>
      </button>
    </div>
  </header>
</template>

<style scoped>
.top-toolbar {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: rgba(18, 20, 19, 0.92);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  padding: 8px 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fff;
  font-size: 12.5px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
  flex-wrap: nowrap;
  overflow-x: auto;
}

.toolbar-left,
.toolbar-center,
.toolbar-right {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.toolbar-brand {
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
}

.toolbar-brand .badge {
  background: #3b6576;
  color: #fff;
  font-size: 9px;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 600;
}

.tb-select {
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #fff;
  padding: 4px 8px;
  border-radius: 5px;
  font-size: 12px;
  outline: none;
  cursor: pointer;
}
.tb-select option {
  background: #1e2220;
  color: #fff;
}

.tb-btn {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  padding: 4px 10px;
  border-radius: 5px;
  font-size: 12px;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  transition: all 0.15s ease;
  white-space: nowrap;
}
.tb-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.35);
}
.tb-btn.active {
  background: #3b6576;
  border-color: #55879c;
  color: #fff;
}

.btn-primary {
  background: #2b5568;
  border-color: #3b6576;
  font-weight: 600;
}
.btn-primary:hover {
  background: #36667c;
}

.zoom-control {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  color: #c0c6c1;
}
.zoom-control input[type="range"] {
  width: 75px;
  accent-color: #3b6576;
  cursor: pointer;
}

.hidden-input {
  display: none;
}
</style>
