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
import MiniDarkBadge from '../atoms/MiniDarkBadge.vue'
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

// Dynamically extract minimal index metadata matching current page chunk
const currentChunkIndexItems = computed(() => {
  if (props.chunk && props.chunk.length) {
    return props.chunk.map(proj => ({
      title: proj.title,
      subtitle: proj.company || proj.subtitle
    }))
  }
  return props.cv.page3.referenceCard?.indexItems || []
})

// Check if projects in current chunk have lightweight mini badges (1-2 lines)
const chunkHasBadges = computed(() => {
  return props.chunk && props.chunk.length > 0 && props.chunk.some(p => Boolean(p.badge))
})

// Check if projects in current chunk have individual paired cards
const chunkHasCards = computed(() => {
  return props.chunk && props.chunk.length > 0 && props.chunk.some(p => Boolean(p.card))
})

// Dynamically generate effective card matching current page context
const effectiveCard = computed(() => {
  const card = props.cv.page3.referenceCard || {}
  if (isContinuation.value) {
    return {
      title: 'PROJECTS · CONT.',
      header: '创作者中台与通信治理',
      indexItems: currentChunkIndexItems.value
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

    <!-- Section Row Layout (Solution 1: Row-paired with baseline alignment) -->
    <div v-if="chunkHasBadges" class="paired-section-rows" :class="{ 'top-expanded': !showHeader }">
      <div class="col-title-bar">
        <AccentDivider />
        <div class="col-title editable">{{ colTitle }}</div>
      </div>

      <div v-for="(item, idx) in chunk" :key="idx" class="section-row">
        <!-- Left: Project Details (no redundant title) -->
        <div class="section-row-main">
          <TimelineItem :item="item" :hide-header="true" />
        </div>

        <!-- Right: Aligned Mini Dark Title Badge + Section Attachments -->
        <div class="section-row-aside">
          <MiniDarkBadge
            v-if="item.badge"
            :category="`PROJECT · ${String(idx + 1 + (chunkIndex * 2)).padStart(2, '0')}`"
            :metric="item.badge.metric"
            :annotation="item.badge.annotation"
          />

          <!-- Attachment for Item 0 -->
          <template v-if="idx === 0">
            <!-- First chunk: Infrastructure & Tools below item 0 badge -->
            <div v-if="!isContinuation && infra && infra.items" class="sidebar-lower-block">
              <AccentDivider />
              <div class="sidebar-block-title editable">{{ infra.title || 'Infrastructure & Tools' }}</div>
              <CompactListItem
                v-for="(m, midx) in infra.items"
                :key="midx"
                :primary="m.degree"
                :secondary="m.school"
                :meta="m.year"
              />
            </div>

            <!-- Continuation chunk: Milestones below item 0 badge -->
            <div v-else-if="isContinuation && cv.page3.milestonesBlock && cv.page3.milestonesBlock.items" class="sidebar-lower-block">
              <AccentDivider />
              <div class="sidebar-block-title editable">{{ cv.page3.milestonesBlock.title || 'Impact & Milestones' }}</div>
              <CompactListItem
                v-for="(m, midx) in cv.page3.milestonesBlock.items"
                :key="midx"
                :primary="m.degree"
                :secondary="m.school"
                :meta="m.year"
              />
            </div>
          </template>

          <!-- Attachment for Item 1 -->
          <template v-else-if="idx === 1">
            <!-- Continuation chunk: Engineering Manifesto below item 1 badge -->
            <ManifestoCard
              v-if="isContinuation && cv.page3.manifesto"
              style="margin-top: 14px;"
              :title="cv.page3.manifesto.title"
              :quote="cv.page3.manifesto.quote"
            />
          </template>
        </div>
      </div>
    </div>

    <!-- Legacy Two-Column Layout (Fallback for cards or classic preset) -->
    <div v-else class="two-col-layout" :class="{ 'top-expanded': !showHeader }">
      <!-- Left Column: Current chunk of projects from top to bottom -->
      <div class="left-col">
        <AccentDivider />
        <div class="col-title editable">{{ colTitle }}</div>
        <div class="main-list">
          <TimelineItem
            v-for="(item, idx) in chunk"
            :key="idx"
            :item="item"
            :hide-header="chunkHasBadges"
          />
        </div>
      </div>

      <!-- Right Column: Contextually distributed sidebar items -->
      <div class="right-sidebar">
        <!-- Solution A: Lightweight Mini Dark Badges (1-2 lines) paired with projects -->
        <template v-if="chunkHasBadges">
          <div class="badges-pair-container">
            <template v-for="(item, idx) in chunk" :key="idx">
              <MiniDarkBadge
                v-if="item.badge"
                :metric="item.badge.metric"
                :annotation="item.badge.annotation"
              />
            </template>
          </div>

          <!-- First page chunk: Infrastructure & Tools below badges -->
          <template v-if="!isContinuation">
            <div v-if="infra && infra.items" class="sidebar-lower-block">
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
          </template>

          <!-- Continuation page chunk: Milestones & Manifesto below badges -->
          <template v-else>
            <div v-if="cv.page3.milestonesBlock && cv.page3.milestonesBlock.items" class="sidebar-lower-block">
              <AccentDivider />
              <div class="sidebar-block-title editable">{{ cv.page3.milestonesBlock.title || 'Impact & Milestones' }}</div>
              <CompactListItem
                v-for="(m, idx) in cv.page3.milestonesBlock.items"
                :key="idx"
                :primary="m.degree"
                :secondary="m.school"
                :meta="m.year"
              />
            </div>
            <ManifestoCard
              v-if="cv.page3.manifesto"
              style="margin-top: 14px;"
              :title="cv.page3.manifesto.title"
              :quote="cv.page3.manifesto.quote"
            />
          </template>
        </template>

        <!-- Paired Project Cards: Each project on left pairs with a dedicated black card on right -->
        <template v-else-if="chunkHasCards">
          <template v-for="(item, idx) in chunk" :key="idx">
            <ReferenceCard
              v-if="item.card"
              :card="item.card"
              custom-class="compact"
            />
          </template>
        </template>

        <!-- Legacy Single Card Layout -->
        <template v-else>
          <!-- Section Hero Card: Dynamically reflects the current chunk's projects -->
          <ReferenceCard :card="effectiveCard" />

          <!-- First page chunk: Infrastructure & Tools -->
          <template v-if="!isContinuation">
            <div v-if="infra && infra.items" class="sidebar-lower-block">
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
          </template>

          <!-- Continuation page chunk: Milestones & Manifesto -->
          <template v-else>
            <div v-if="cv.page3.milestonesBlock && cv.page3.milestonesBlock.items" class="sidebar-lower-block">
              <AccentDivider />
              <div class="sidebar-block-title editable">{{ cv.page3.milestonesBlock.title || 'Impact & Milestones' }}</div>
              <CompactListItem
                v-for="(m, idx) in cv.page3.milestonesBlock.items"
                :key="idx"
                :primary="m.degree"
                :secondary="m.school"
                :meta="m.year"
              />
            </div>
            <ManifestoCard
              v-if="cv.page3.manifesto"
              style="margin-top: 18px;"
              :title="cv.page3.manifesto.title"
              :quote="cv.page3.manifesto.quote"
            />
          </template>
        </template>
      </div>
    </div>
  </A4Sheet>
</template>
