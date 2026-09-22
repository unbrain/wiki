<script setup lang="ts">
import type { CVReferenceCard } from '../../types/cv'
import CutoutCard from '../atoms/CutoutCard.vue'

defineProps<{
  card?: CVReferenceCard
}>()

function cleanPrefix(val?: string, prefix?: string) {
  if (!val) return ''
  return val.replace(new RegExp(`^${prefix}\\s*\\|\\s*`), '')
}
</script>

<template>
  <CutoutCard v-if="card" :title="card.title || 'Reference'">
    <template #header>
      <div v-if="card.name || card.header" class="ref-name editable">{{ card.name || card.header }}</div>
      <div v-if="card.role" class="ref-role editable">{{ card.role }}</div>
    </template>

    <!-- Summary / Overview block inside card -->
    <div v-if="card.summary" class="ref-summary editable" v-html="card.summary"></div>

    <!-- Phone & Email (or custom items) -->
    <div v-if="card.phone" class="ref-line editable">
      <span class="ref-prefix">P |</span> {{ cleanPrefix(card.phone, 'P') }}
    </div>
    <div v-if="card.email" class="ref-line editable">
      <span class="ref-prefix">E |</span> {{ cleanPrefix(card.email, 'E') }}
    </div>

    <!-- Capability radar / items list -->
    <template v-if="card.items && card.items.length">
      <div v-for="(line, idx) in card.items" :key="idx" class="ref-line editable">
        {{ line }}
      </div>
    </template>

    <template #footer>
      <div v-if="card.endorsement" class="ref-endorsement editable">
        {{ card.endorsement }}
      </div>
    </template>
  </CutoutCard>
</template>
