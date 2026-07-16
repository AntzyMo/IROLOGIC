<script setup lang="ts">
  import { Button } from 'moriui'
  import type { Mode } from '~/types/practice'

  const mode = defineModel<Mode>('mode', { required: true })

  const options: { value: Mode, label: string }[] = [
    { value: 'light', label: '✦ 光' },
    { value: 'pigment', label: '● 颜料' },
    { value: 'mixed', label: '⟲ 混合' }
  ]
</script>

<template>
  <div class="mode-switch mb-4 flex flex-wrap gap-3" aria-label="练习模式">
    <Button
      v-for="option in options"
      :key="option.value"
      type="button"
      :aria-pressed="mode === option.value"
      @click="mode = option.value"
    >
      {{ option.label }}
    </Button>
  </div>
</template>
