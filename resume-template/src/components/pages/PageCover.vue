<script setup lang="ts">
import { computed } from 'vue'
import type { CVData } from '../../types/cv'
import A4Sheet from '../atoms/A4Sheet.vue'
import PillBadge from '../atoms/PillBadge.vue'
import DotsIndicator from '../atoms/DotsIndicator.vue'
import HeroNameTitle from '../atoms/HeroNameTitle.vue'
import EditorialGrid from '../layouts/EditorialGrid.vue'

const props = defineProps<{
  cv: CVData
  active?: boolean
}>()

const emit = defineEmits<{
  (e: 'replace-photo'): void
}>()

const photoStyle = computed(() => {
  const s: Record<string, string> = {}
  if (props.cv.person.photoPosition) s.objectPosition = props.cv.person.photoPosition
  if (props.cv.person.photoScale) s.transform = `scale(${props.cv.person.photoScale})`
  return s
})
</script>

<template>
  <A4Sheet page-id="page-1" :page-num="1" tag-text="Page 01 · About Me / Cover" :active="active">
    <div>
      <!-- Top Navigation Bar: Domain and Year Badge -->
      <div class="page-1-top-bar">
        <div class="page-1-domain-line">
          <span class="thick-line"></span>
          <span class="editable">{{ cv.meta.website }}</span>
        </div>
        <PillBadge :text="cv.meta.year || 'Year 2028'" />
      </div>

      <!-- Hero Title: Big Name & Role -->
      <HeroNameTitle
        :name-first="cv.person.nameFirst"
        :name-last="cv.person.nameLast"
        :name-cn="cv.person.nameCn"
        :role="cv.person.role"
      />

      <hr class="editorial-hr" />

      <!-- Editorial Asymmetric Intro Grid (140px + 1fr) -->
      <EditorialGrid custom-class="p1-intro-grid">
        <template #left>
          <div class="p1-intro-left editable" v-html="cv.person.greeting"></div>
        </template>
        <template #right>
          <div class="p1-intro-right editable" v-html="cv.person.introBio"></div>
        </template>
      </EditorialGrid>
    </div>

    <!-- Visual Area: Dots, Folder Photo & Address Block -->
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
  </A4Sheet>
</template>
