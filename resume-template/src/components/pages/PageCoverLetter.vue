<script setup lang="ts">
import { computed } from 'vue'
import type { CVData } from '../../types/cv'
import A4Sheet from '../atoms/A4Sheet.vue'
import CoverLetterTopBar from '../widgets/CoverLetterTopBar.vue'
import HeroNameTitle from '../atoms/HeroNameTitle.vue'
import AccentDivider from '../atoms/AccentDivider.vue'
import DotsIndicator from '../atoms/DotsIndicator.vue'
import EditorialGrid from '../layouts/EditorialGrid.vue'

const props = defineProps<{
  cv: CVData
  pageNum: number
  active?: boolean
}>()

const clData = computed(() => {
  // If in 3-page mode, cover letter data is in cv.page3; in 4+ page mode it is in cv.page4
  return props.cv.page4 || props.cv.page3 || {}
})

const pageTag = computed(() => {
  const numStr = String(props.pageNum).padStart(2, '0')
  return `Page ${numStr} · Cover Letter`
})

function formatAddress(addr?: string) {
  if (!addr) return ''
  return addr.replace(/A\s*\|\s*/g, '<span class="to-prefix">A |</span> ')
}

const isChineseSignature = computed(() => {
  return /[\u4e00-\u9fa5]/.test(clData.value.signatureText || props.cv.person.nameCn || '')
})
</script>

<template>
  <A4Sheet page-id="page-letter" :page-num="pageNum" :tag-text="pageTag" :active="active">
    <div>
      <!-- Top Bar: Badge, Centered Contacts, Year Badge -->
      <CoverLetterTopBar
        :badge="clData.badge || 'Cover Letter'"
        :contacts="cv.meta.coverLetterContacts"
        :year-badge="clData.yearBadge || 'Year 2028'"
      />

      <!-- Hero Title: Indented matching the column below -->
      <div class="page-4-hero-group">
        <HeroNameTitle
          :name-first="cv.person.nameFirst"
          :name-last="cv.person.nameLast"
          :name-cn="cv.person.nameCn"
          :role="cv.person.role"
        />
      </div>

      <hr class="editorial-hr" />

      <!-- Metadata Grid: Cover Letter Date on Left, Recipient on Right -->
      <EditorialGrid custom-class="cl-meta-grid">
        <template #left>
          <div class="cl-meta-left">
            <div class="cl-label editable">{{ clData.dateTitle || 'Cover Letter.' }}</div>
            <div class="cl-date editable">{{ clData.date || '2028 年 3 月' }}</div>
          </div>
        </template>
        <template #right>
          <div v-if="clData.recipient" class="cl-recipient-box">
            <div class="to-label editable">{{ clData.recipient.label || 'TO' }}</div>
            <div class="to-name editable">{{ clData.recipient.name }}</div>
            <div class="to-role editable">{{ clData.recipient.role }}</div>
            <div class="to-address editable" v-html="formatAddress(clData.recipient.address)"></div>
          </div>
        </template>
      </EditorialGrid>

      <!-- Accent Divider Line: █───────────── -->
      <div style="margin-top: 14px; margin-bottom: 20px;">
        <AccentDivider />
      </div>

      <!-- Letter Body Grid: Side Title on Left, Letter Paragraphs on Right -->
      <EditorialGrid custom-class="cl-letter-grid">
        <template #left>
          <div class="cl-letter-side-title editable">
            {{ clData.letterTitle || '应聘岗位' }}
          </div>
        </template>
        <template #right>
          <div class="cl-letter-body-content editable">
            <p v-for="(p, idx) in clData.letterBody || []" :key="idx" v-html="p"></p>
          </div>
        </template>
      </EditorialGrid>

      <!-- Signoff Area: Sincerely, Fluid Cursive Signature, Signer Name -->
      <div class="cl-signoff-area">
        <div class="cl-sincerely editable">{{ clData.sincerely || 'Sincerely' }}</div>
        <div class="cl-signature-box">
          <span
            class="signature-font-text editable"
            :class="{ 'is-chinese-art': isChineseSignature }"
          >{{ clData.signatureText || 'Signature' }}</span>
        </div>
        <div class="cl-signer-name editable">{{ clData.signerName }}</div>
      </div>
    </div>

    <!-- Bottom Left 3-Dot Indicator -->
    <div class="cl-footer-dots">
      <DotsIndicator />
    </div>
  </A4Sheet>
</template>
