<script setup lang="ts">
import { computed } from 'vue'
import type { CVData } from '../../types/cv'
import A4Page from '../A4Page.vue'
import PillBadge from '../PillBadge.vue'
import DotsIndicator from '../DotsIndicator.vue'

const props = defineProps<{
  cv: CVData
  active?: boolean
}>()

const emit = defineEmits<{
  (e: 'replace-photo'): void
}>()

const heroNameLines = computed(() => {
  if (props.cv.person.nameFirst && props.cv.person.nameLast) {
    return [props.cv.person.nameFirst, props.cv.person.nameLast]
  }
  return [props.cv.person.nameCn || 'RESUME']
})

const photoStyle = computed(() => {
  const s: Record<string, string> = {}
  if (props.cv.person.photoPosition) s.objectPosition = props.cv.person.photoPosition
  if (props.cv.person.photoScale) s.transform = `scale(${props.cv.person.photoScale})`
  return s
})
</script>

<template>
  <A4Page page-id="page-1" :page-num="1" tag-text="Page 01 · About Me / Cover" :active="active">
    <div>
      <div class="page-1-top-bar">
        <div class="page-1-domain-line">
          <span class="thick-line"></span>
          <span class="editable">{{ cv.meta.website }}</span>
        </div>
        <PillBadge :text="cv.meta.year || 'Year 2028'" />
      </div>

      <div class="hero-title-group">
        <div class="hero-name editable">
          <template v-for="(line, idx) in heroNameLines" :key="idx">
            {{ line }}<br v-if="idx < heroNameLines.length - 1" />
          </template>
        </div>
        <div class="hero-role editable">{{ cv.person.role }}</div>
      </div>

      <hr class="editorial-hr" />

      <div class="p1-intro-grid">
        <div class="p1-intro-left editable" v-html="cv.person.greeting"></div>
        <div class="p1-intro-right editable" v-html="cv.person.introBio"></div>
      </div>
    </div>

    <div class="p1-lower-area">
      <div class="p1-dots-wrapper">
        <DotsIndicator />
      </div>

      <div class="p1-visual-and-info">
        <div
          class="photo-folder-container"
          :class="{ 'is-contain': cv.person.photoFit === 'contain' }"
          title="Click to replace photo"
          @click="emit('replace-photo')"
        >
          <img
            :src="cv.person.photo"
            :style="photoStyle"
            alt="Hero Photo"
            onerror="this.src='assets/avatar-user.png'"
          />
          <div class="replace-hint">Click to replace photo</div>
        </div>

        <div class="p1-address-block">
          <div class="p1-address-label editable">{{ cv.meta.addressTitle || 'ADDRESS :' }}</div>
          <div class="p1-address-lines editable" v-html="cv.meta.addressLines"></div>
        </div>

        <div class="p1-about-stamp editable">{{ cv.person.aboutStamp || 'About Me.' }}</div>
      </div>
    </div>
  </A4Page>
</template>
