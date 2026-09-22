<script setup lang="ts">
import CutoutCard from '../atoms/CutoutCard.vue'

defineProps<{
  title?: string
  name?: string
  role?: string
  phone?: string
  email?: string
  endorsement?: string
}>()

function cleanPrefix(val?: string, prefix?: string) {
  if (!val) return ''
  return val.replace(new RegExp(`^${prefix}\\s*\\|\\s*`), '')
}
</script>

<template>
  <CutoutCard :title="title || 'Reference'">
    <template #header>
      <div v-if="name" class="ref-name editable">{{ name }}</div>
      <div v-if="role" class="ref-role editable">{{ role }}</div>
    </template>

    <div v-if="phone" class="ref-line editable">
      <span class="ref-prefix">P |</span> {{ cleanPrefix(phone, 'P') }}
    </div>
    <div v-if="email" class="ref-line editable">
      <span class="ref-prefix">E |</span> {{ cleanPrefix(email, 'E') }}
    </div>

    <template #footer>
      <div v-if="endorsement" class="ref-endorsement editable">
        {{ endorsement }}
      </div>
    </template>
  </CutoutCard>
</template>
