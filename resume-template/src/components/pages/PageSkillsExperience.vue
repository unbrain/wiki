<script setup lang="ts">
import { computed } from 'vue'
import type { CVData } from '../../types/cv'
import A4Page from '../A4Page.vue'
import PillBadge from '../PillBadge.vue'
import AccentDivider from '../AccentDivider.vue'
import ReferenceCard from '../ReferenceCard.vue'
import JobItem from '../JobItem.vue'

const props = defineProps<{
  cv: CVData
  active?: boolean
}>()

const isThreePageMode = computed(() => (props.cv.pageCount || 3) === 3)

const heroNameLines = computed(() => {
  if (props.cv.person.nameFirst && props.cv.person.nameLast) {
    return [props.cv.person.nameFirst, props.cv.person.nameLast]
  }
  return [props.cv.person.nameCn || 'RESUME']
})

const pageTag = computed(() => isThreePageMode.value ? 'Page 02 · Resume / CV' : 'Page 02 · Skills & Architecture')
const pageBadge = computed(() => isThreePageMode.value ? (props.cv.page2.badge || 'Resume') : (props.cv.page2.badge || 'Skills & Architecture'))
const colTitle = computed(() => isThreePageMode.value ? (props.cv.page2.expTitle || 'Work Experience') : (props.cv.page2.expTitle || 'Core Technical Pillars'))
const listItems = computed(() => isThreePageMode.value ? (props.cv.page2.experiences || []) : (props.cv.page2.skills || props.cv.page2.experiences || []))
</script>

<template>
  <A4Page page-id="page-2" :page-num="2" :tag-text="pageTag" :active="active">
    <div>
      <div class="editorial-page-header">
        <div>
          <PillBadge :text="pageBadge" />
        </div>
        <div class="editorial-page-header-right">
          <div class="hero-name editable">
            <template v-for="(line, idx) in heroNameLines" :key="idx">
              {{ line }}<br v-if="idx < heroNameLines.length - 1" />
            </template>
          </div>
          <div class="hero-role editable">{{ cv.person.role }}</div>
        </div>
      </div>

      <hr class="editorial-hr" />

      <div class="overview-grid">
        <div class="overview-heading editable" v-html="cv.page2.profileTitle || 'Profile<br>Overview'"></div>
        <div class="overview-text editable" v-html="cv.page2.profileOverview"></div>
      </div>

      <hr class="editorial-hr" />
    </div>

    <div class="two-col-layout">
      <div class="left-col">
        <AccentDivider />
        <div class="col-title editable">{{ colTitle }}</div>
        <div class="main-list">
          <JobItem v-for="(item, idx) in listItems" :key="idx" :item="item" />
        </div>
      </div>

      <div class="right-sidebar">
        <!-- Reference Card (or Capability Radar) -->
        <ReferenceCard :card="cv.page2.referenceCard" />

        <!-- Education -->
        <div v-if="cv.page2.education" class="sidebar-lower-block">
          <AccentDivider />
          <div class="sidebar-block-title editable">{{ cv.page2.education.title || 'Education' }}</div>
          <div v-for="(edu, idx) in cv.page2.education.items || []" :key="idx" class="list-item">
            <div class="item-primary">
              <span class="sq-bullet"></span>
              <span class="editable">{{ edu.degree }}</span>
            </div>
            <div class="item-secondary editable">{{ edu.school }}</div>
            <div class="item-meta editable">{{ edu.year }}</div>
          </div>
        </div>

        <!-- Extra Artifacts / Knowledge Base (if present) -->
        <div v-if="cv.page2.extraArtifacts && cv.page2.extraArtifacts.items" class="sidebar-lower-block" style="margin-top: 14px;">
          <div class="sidebar-block-title editable">{{ cv.page2.extraArtifacts.title }}</div>
          <div v-for="(art, idx) in cv.page2.extraArtifacts.items" :key="idx" class="list-item">
            <div class="item-primary">
              <span class="sq-bullet"></span>
              <span class="editable">{{ art.degree }}</span>
            </div>
            <div class="item-secondary editable">{{ art.school }}</div>
            <div class="item-meta editable">{{ art.year }}</div>
          </div>
        </div>
      </div>
    </div>
  </A4Page>
</template>
