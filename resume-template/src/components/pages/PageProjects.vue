<script setup lang="ts">
import { computed } from 'vue'
import type { CVData, CVExperience } from '../../types/cv'
import A4Sheet from '../atoms/A4Sheet.vue'
import PillBadge from '../atoms/PillBadge.vue'
import AccentDivider from '../atoms/AccentDivider.vue'
import HeroNameTitle from '../atoms/HeroNameTitle.vue'
import TimelineItem from '../atoms/TimelineItem.vue'
import CompactListItem from '../atoms/CompactListItem.vue'
import ManifestoCard from '../atoms/ManifestoCard.vue'
import EditorialGrid from '../layouts/EditorialGrid.vue'
import ReferenceCard from '../widgets/ReferenceCard.vue'

const props = defineProps<{
  cv: CVData
  chunkIndex: number
  totalChunks: number
  chunk: CVExperience[]
  pageNum: number
  active?: boolean
}>()

const isContinuation = computed(() => props.chunkIndex > 0)

const pageTag = computed(() => {
  const numStr = String(props.pageNum).padStart(2, '0')
  return isContinuation.value
    ? `Page ${numStr} · Production Projects (Cont.)`
    : `Page ${numStr} · Work Experience & Projects`
})

const colTitle = computed(() => {
  return isContinuation.value
    ? `${props.cv.page3.expTitle || 'Production Projects'} (Cont.)`
    : (props.cv.page3.expTitle || 'Production Projects')
})

const infra = computed(() => props.cv.page3.infrastructureBlock || props.cv.page3.materialBlock)
const showHeader = computed(() => Boolean(props.cv.page3.showHeader))

// In Option A (no top header), the dark card becomes the section hero guide badge
const effectiveCard = computed(() => {
  const card = props.cv.page3.referenceCard || {}
  if (!showHeader.value) {
    return {
      title: card.title || colTitle.value,
      header: card.header || card.name,
      indexItems: card.indexItems,
      ...card
    }
  }
  return card
})
</script>

<template>
  <A4Sheet :page-id="`page-${pageNum}`" :page-num="pageNum" :tag-text="pageTag" :active="active">
    <!-- Top Hero Header (Only rendered when showHeader is explicitly true) -->
    <div v-if="showHeader">
      <div class="editorial-page-header">
        <div>
          <PillBadge :text="props.cv.page3.badge || 'Production Projects'" />
        </div>
        <HeroNameTitle
          custom-class="editorial-page-header-right"
          :name-first="cv.person.nameFirst"
          :name-last="cv.person.nameLast"
          :name-cn="cv.person.nameCn"
          :role="cv.person.role"
        />
      </div>

      <hr class="editorial-hr" />

      <EditorialGrid custom-class="overview-grid">
        <template #left>
          <div
            v-if="!isContinuation"
            class="overview-heading editable"
            v-html="cv.page3.profileTitle || 'Engineering<br>Track Record'"
          ></div>
          <div v-else class="overview-heading editable">System<br>Architecture</div>
        </template>
        <template #right>
          <div
            v-if="!isContinuation"
            class="overview-text editable"
            v-html="cv.page3.profileOverview"
          ></div>
          <div v-else class="overview-text editable">
            深度攻坚数亿级访问量大型系统的高性能渲染、微前端基建与高并发通信架构，持续追求每一行代码的可验证性与工程健壮性。
          </div>
        </template>
      </EditorialGrid>

      <hr class="editorial-hr" />
    </div>

    <!-- Main Two-Column Layout (Expanded to top when showHeader is false) -->
    <div class="two-col-layout" :class="{ 'top-expanded': !showHeader }">
      <!-- Left Column: Current chunk of projects from top to bottom -->
      <div class="left-col">
        <AccentDivider />
        <div class="col-title editable">{{ colTitle }}</div>
        <div class="main-list">
          <TimelineItem v-for="(item, idx) in chunk" :key="idx" :item="item" />
        </div>
      </div>

      <!-- Right Column: Contextually distributed sidebar items -->
      <div class="right-sidebar">
        <!-- First page chunk: Section Hero Card -->
        <template v-if="!isContinuation">
          <ReferenceCard :card="effectiveCard" />

          <!-- If only 1 chunk total, also show infrastructure & manifesto here -->
          <template v-if="totalChunks === 1">
            <div v-if="infra && infra.items" class="sidebar-lower-block">
              <AccentDivider />
              <div class="sidebar-block-title editable">{{ infra.title || 'Infrastructure' }}</div>
              <CompactListItem
                v-for="(m, idx) in infra.items"
                :key="idx"
                :primary="m.degree"
                :secondary="m.school"
                :meta="m.year"
              />
            </div>

            <ManifestoCard
              v-if="cv.page3.manifesto"
              :title="cv.page3.manifesto.title"
              :quote="cv.page3.manifesto.quote"
            />
          </template>
        </template>

        <!-- Continuation page chunk: Infrastructure & Tools + Manifesto -->
        <template v-else>
          <div v-if="infra && infra.items" class="sidebar-lower-block" style="margin-top: 0;">
            <AccentDivider />
            <div class="sidebar-block-title editable">{{ infra.title || 'Infrastructure & Tools' }}</div>
            <CompactListItem
              v-for="(m, idx) in infra.items"
              :key="idx"
              :primary="m.degree"
              :secondary="m.school"
              :meta="m.year"
            />
          </div>

          <ManifestoCard
            v-if="cv.page3.manifesto"
            :title="cv.page3.manifesto.title"
            :quote="cv.page3.manifesto.quote"
          />
        </template>
      </div>
    </div>
  </A4Sheet>
</template>
