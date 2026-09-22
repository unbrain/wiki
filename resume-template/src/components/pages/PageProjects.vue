<script setup lang="ts">
import { computed } from 'vue'
import type { CVData, CVExperience } from '../../types/cv'
import A4Page from '../A4Page.vue'
import PillBadge from '../PillBadge.vue'
import AccentDivider from '../AccentDivider.vue'
import ReferenceCard from '../ReferenceCard.vue'
import JobItem from '../JobItem.vue'

const props = defineProps<{
  cv: CVData
  chunkIndex: number
  totalChunks: number
  chunk: CVExperience[]
  pageNum: number
  active?: boolean
}>()

const isContinuation = computed(() => props.chunkIndex > 0)

const heroNameLines = computed(() => {
  if (props.cv.person.nameFirst && props.cv.person.nameLast) {
    return [props.cv.person.nameFirst, props.cv.person.nameLast]
  }
  return [props.cv.person.nameCn || 'RESUME']
})

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
</script>

<template>
  <A4Page :page-id="`page-${pageNum}`" :page-num="pageNum" :tag-text="pageTag" :active="active">
    <div>
      <div class="editorial-page-header">
        <div>
          <PillBadge :text="props.cv.page3.badge || 'Production Projects'" />
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
        <template v-if="!isContinuation">
          <div class="overview-heading editable" v-html="cv.page3.profileTitle || 'Engineering<br>Track Record'"></div>
          <div class="overview-text editable" v-html="cv.page3.profileOverview"></div>
        </template>
        <template v-else>
          <div class="overview-heading editable">System<br>Architecture</div>
          <div class="overview-text editable">深度攻坚数亿级访问量大型系统的高性能渲染、微前端基建与高并发通信架构，持续追求每一行代码的可验证性与工程健壮性。</div>
        </template>
      </div>

      <hr class="editorial-hr" />
    </div>

    <div class="two-col-layout">
      <!-- Left Column: Current chunk of projects -->
      <div class="left-col">
        <AccentDivider />
        <div class="col-title editable">{{ colTitle }}</div>
        <div class="main-list">
          <JobItem v-for="(item, idx) in chunk" :key="idx" :item="item" />
        </div>
      </div>

      <!-- Right Column: Contextually distributed sidebar items -->
      <div class="right-sidebar">
        <!-- First page chunk: Reference card -->
        <template v-if="!isContinuation">
          <ReferenceCard :card="cv.page3.referenceCard" />

          <!-- If only 1 chunk total, also show infrastructure & manifesto here -->
          <template v-if="totalChunks === 1">
            <div v-if="infra && infra.items" class="sidebar-lower-block">
              <AccentDivider />
              <div class="sidebar-block-title editable">{{ infra.title || 'Infrastructure' }}</div>
              <div v-for="(m, idx) in infra.items" :key="idx" class="list-item">
                <div class="item-primary">
                  <span class="sq-bullet"></span>
                  <span class="editable">{{ m.degree }}</span>
                </div>
                <div class="item-secondary editable">{{ m.school }}</div>
                <div class="item-meta editable">{{ m.year }}</div>
              </div>
            </div>

            <div v-if="cv.page3.manifesto" class="manifesto-box">
              <div class="m-title editable">{{ cv.page3.manifesto.title }}</div>
              <div class="m-quote editable">{{ cv.page3.manifesto.quote }}</div>
            </div>
          </template>
        </template>

        <!-- Continuation page chunk: Infrastructure & Tools + Manifesto -->
        <template v-else>
          <div v-if="infra && infra.items" class="sidebar-lower-block" style="margin-top: 0;">
            <AccentDivider />
            <div class="sidebar-block-title editable">{{ infra.title || 'Infrastructure & Tools' }}</div>
            <div v-for="(m, idx) in infra.items" :key="idx" class="list-item">
              <div class="item-primary">
                <span class="sq-bullet"></span>
                <span class="editable">{{ m.degree }}</span>
              </div>
              <div class="item-secondary editable">{{ m.school }}</div>
              <div class="item-meta editable">{{ m.year }}</div>
            </div>
          </div>

          <div v-if="cv.page3.manifesto" class="manifesto-box">
            <div class="m-title editable">{{ cv.page3.manifesto.title }}</div>
            <div class="m-quote editable">{{ cv.page3.manifesto.quote }}</div>
          </div>
        </template>
      </div>
    </div>
  </A4Page>
</template>
