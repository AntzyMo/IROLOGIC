<script setup lang="ts">
  import { Button } from 'moriui'
  import type { System } from '~/types/practice'

  const system = defineModel<System>('system', { required: true })

  const options: { value: System, label: string }[] = [
    { value: 'light', label: '光' },
    { value: 'pigment', label: '颜料' }
  ]
</script>

<template>
  <div class="display-switch flex gap-3" aria-label="规律速查展示模式">
    <Button
      v-for="option in options"
      :key="option.value"
      type="button"
      :aria-pressed="system === option.value"
      @click="system = option.value"
    >
      {{ option.label }}
    </Button>
  </div>
</template>
