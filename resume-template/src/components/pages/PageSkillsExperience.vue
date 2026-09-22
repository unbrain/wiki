<script setup lang="ts">
import { computed } from 'vue'
import type { CVData } from '../../types/cv'
import A4Sheet from '../atoms/A4Sheet.vue'
import PillBadge from '../atoms/PillBadge.vue'
import AccentDivider from '../atoms/AccentDivider.vue'
import HeroNameTitle from '../atoms/HeroNameTitle.vue'
import TimelineItem from '../atoms/TimelineItem.vue'
import CompactListItem from '../atoms/CompactListItem.vue'
import EditorialGrid from '../layouts/EditorialGrid.vue'
import ReferenceCard from '../widgets/ReferenceCard.vue'

const props = defineProps<{
  cv: CVData
  active?: boolean
}>()

const isThreePageMode = computed(() => (props.cv.pageCount || 3) === 3)

const pageTag = computed(() => isThreePageMode.value ? 'Page 02 · Resume / CV' : 'Page 02 · Skills & Architecture')
const pageBadge = computed(() => isThreePageMode.value ? (props.cv.page2.badge || 'Resume') : (props.cv.page2.badge || 'Skills & Architecture'))
const colTitle = computed(() => isThreePageMode.value ? (props.cv.page2.expTitle || 'Work Experience') : (props.cv.page2.expTitle || 'Core Technical Pillars'))
const listItems = computed(() => isThreePageMode.value ? (props.cv.page2.experiences || []) : (props.cv.page2.skills || props.cv.page2.experiences || []))
const showHeader = computed(() => Boolean(props.cv.page2.showHeader))

// In Option A (no top header), the dark card becomes the section hero guide badge
const effectiveCard = computed(() => {
  const card = props.cv.page2.referenceCard || {}
  if (!showHeader.value) {
    return {
      ...card,
      title: card.title || colTitle.value,
      header: card.header || card.name,
      summary: card.summary || props.cv.page2.profileOverview
    }
  }
  return card
})
</script>

<template>
  <A4Sheet page-id="page-2" :page-num="2" :tag-text="pageTag" :active="active">
    <!-- Top Hero Header (Only rendered when showHeader is explicitly true) -->
    <div v-if="showHeader">
      <div class="editorial-page-header">
        <div>
          <PillBadge :text="pageBadge" />
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
          <div class="overview-heading editable" v-html="cv.page2.profileTitle || 'Profile<br>Overview'"></div>
        </template>
        <template #right>
          <div class="overview-text editable" v-html="cv.page2.profileOverview"></div>
        </template>
      </EditorialGrid>

      <hr class="editorial-hr" />
    </div>

    <!-- Main Two-Column Layout (Expanded to top when showHeader is false) -->
    <div class="two-col-layout" :class="{ 'top-expanded': !showHeader }">
      <!-- Left Column: Work Experience from top to bottom -->
      <div class="left-col">
        <AccentDivider />
        <div class="col-title editable">{{ colTitle }}</div>
        <div class="main-list">
          <TimelineItem v-for="(item, idx) in listItems" :key="idx" :item="item" />
        </div>
      </div>

      <!-- Right Column: Dark Hero Card & Education -->
      <div class="right-sidebar">
        <!-- Section Hero Card (Chapter badge in Option A) -->
        <ReferenceCard :card="effectiveCard" />

        <!-- Education -->
        <div v-if="cv.page2.education" class="sidebar-lower-block">
          <AccentDivider />
          <div class="sidebar-block-title editable">{{ cv.page2.education.title || 'Education' }}</div>
          <CompactListItem
            v-for="(edu, idx) in cv.page2.education.items || []"
            :key="idx"
            :primary="edu.degree"
            :secondary="edu.school"
            :meta="edu.year"
          />
        </div>

        <!-- Extra Artifacts / Knowledge Base (if present) -->
        <div v-if="cv.page2.extraArtifacts && cv.page2.extraArtifacts.items" class="sidebar-lower-block" style="margin-top: 14px;">
          <div class="sidebar-block-title editable">{{ cv.page2.extraArtifacts.title }}</div>
          <CompactListItem
            v-for="(art, idx) in cv.page2.extraArtifacts.items"
            :key="idx"
            :primary="art.degree"
            :secondary="art.school"
            :meta="art.year"
          />
        </div>
      </div>
    </div>
  </A4Sheet>
</template>
