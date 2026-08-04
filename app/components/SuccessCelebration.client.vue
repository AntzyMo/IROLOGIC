<script setup lang="ts">
  import { onUnmounted, watch } from 'vue'
  import confetti from 'canvas-confetti'
  import { useReducedMotion } from 'motion-v'

  const props = defineProps<{
    /** 单调递增的庆祝信号，变化一次触发一次庆祝；null 表示从未触发。
     *  契约：信号在挂载时已非 null 不会触发庆祝（watch 无 immediate） */
    celebrate: number | null
  }>()

  const shouldReduceMotion = useReducedMotion()

  const celebrationColours = ['#ef5148', '#f1ca3d', '#9fca4e', '#62cfda', '#637bed', '#bc66c6']

  watch(() => props.celebrate, (signal) => {
    if (signal === null || shouldReduceMotion.value)
      return

    confetti({
      particleCount: 100,
      spread: 100,
      startVelocity: 45,
      ticks: 200,
      origin: { x: 0.5, y: 0.62 },
      colors: celebrationColours,
      zIndex: 100
    })
  })

  onUnmounted(() => confetti.reset())
</script>

<template>
  <!-- 零渲染组件：庆祝效果由 canvas-confetti 的全屏画布呈现 -->
</template>
