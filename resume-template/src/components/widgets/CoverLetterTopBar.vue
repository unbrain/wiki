<script setup lang="ts">
import PillBadge from '../atoms/PillBadge.vue'

defineProps<{
  badge?: string
  contacts?: string
  yearBadge?: string
}>()

function formatContacts(html?: string) {
  if (!html) return ''
  return html
    .replace(/P\s*\|\s*/g, '<span class="cl-prefix">P |</span> ')
    .replace(/L\s*\|\s*/g, '<span class="cl-prefix">L |</span> ')
    .replace(/E\s*\|\s*/g, '<span class="cl-prefix">E |</span> ')
}
</script>

<template>
  <div class="cl-top-bar">
    <PillBadge :text="badge || 'Cover Letter'" />
    <div class="cl-contact-summary editable" v-html="formatContacts(contacts)"></div>
    <PillBadge :text="yearBadge || 'Year 2028'" />
  </div>
</template>
