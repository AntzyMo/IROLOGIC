<script setup lang="ts">
  import { computed } from 'vue'
  import { motion, useReducedMotion } from 'motion-v'
  import type { ColourId, GradeResult, Question } from '~/types/practice'

  import { colourLabels, colourWheelOrder } from '~/data/colourRules'

  const props = defineProps<{
    question: Question
    feedback: GradeResult | null
  }>()

  type Point = readonly [number, number]

  const shouldReduceMotion = useReducedMotion()

  const nodeCoordinates: Readonly<Record<ColourId, Point>> = {
    red: [50, 9],
    yellow: [83, 29],
    green: [83, 71],
    cyan: [50, 91],
    blue: [17, 71],
    magenta: [17, 29]
  }

  const swatchColours: Readonly<Record<ColourId, string>> = {
    red: '#ef5148',
    yellow: '#f1ca3d',
    green: '#9fca4e',
    cyan: '#62cfda',
    blue: '#637bed',
    magenta: '#bc66c6'
  }

  const paths = computed(() => props.question.inputs.map(input => {
    const [startX, startY] = nodeCoordinates[input]
    const [endX, endY] = nodeCoordinates[props.question.result]

    return {
      input,
      path: `M ${startX} ${startY} L ${endX} ${endY}`
    }
  }))

  const isRevealed = computed(() => props.feedback !== null)
  const recipeLabel = computed(() => `${props.question.inputs.map(colour => colourLabels[colour]).join(' + ')} = ${colourLabels[props.question.result]}`)
  const pathTransition = computed(() => shouldReduceMotion.value
    ? { duration: 0 }
    : { duration: 0.48, delay: 0.12, ease: 'easeOut' })
  const resultTransition = computed(() => shouldReduceMotion.value
    ? { duration: 0 }
    : { type: 'spring', stiffness: 360, damping: 18, delay: 0.58 })

  function isRecipeColour(colour: ColourId) {
    return props.question.inputs.includes(colour) || props.question.result === colour
  }
</script>

<template>
  <section
    class="min-w-0 max-[46rem]:order-2"
    :data-recipe-animation="isRevealed ? question.id : 'idle'"
    aria-label="六角色彩参考盘"
  >
    <svg
      class="mx-auto block w-[min(100%,27rem)] overflow-visible"
      viewBox="0 0 100 100"
      role="img"
      :aria-label="isRevealed ? `正确配方：${recipeLabel}` : '红、黄、绿、青、蓝、品红的固定色彩位置'"
    >
      <polygon class="fill-none stroke-[rgb(32_34_44_/_12%)] [stroke-width:.65]" points="50,9 83,29 83,71 50,91 17,71 17,29" />

      <g :key="question.id">
        <motion.path
          v-for="path in paths"
          :key="`${path.input}-glow`"
          class="[stroke-linecap:round] [stroke-width:3.5] [filter:blur(1.45px)]"
          :d="path.path"
          :stroke="swatchColours[path.input]"
          fill="none"
          :initial="false"
          :animate="isRevealed ? { pathLength: 1, opacity: .48 } : { pathLength: 0, opacity: 0 }"
          :transition="pathTransition"
        />

        <motion.path
          v-for="path in paths"
          :key="`${path.input}-beam`"
          class="[stroke-linecap:round] [stroke-width:.9] [filter:drop-shadow(0_0_1.2px_rgb(255_255_255_/_75%))]"
          :d="path.path"
          :stroke="swatchColours[path.input]"
          fill="none"
          :initial="false"
          :animate="isRevealed ? { pathLength: 1, opacity: .96 } : { pathLength: 0, opacity: 0 }"
          :transition="pathTransition"
        />

        <motion.circle
          v-for="colour in colourWheelOrder"
          :key="`${colour}-halo`"
          class="[filter:blur(1.55px)]"
          :cx="nodeCoordinates[colour][0]"
          :cy="nodeCoordinates[colour][1]"
          :fill="swatchColours[colour]"
          :initial="false"
          :animate="isRevealed && isRecipeColour(colour)
            ? { opacity: colour === question.result ? .26 : .1, r: colour === question.result ? 10.4 : 8.25 }
            : { opacity: 0, r: 7.5 }"
          :transition="colour === question.result ? resultTransition : pathTransition"
        />

        <motion.text
          class="fill-[rgb(32_34_44_/_84%)] text-[3.35px] font-bold [font-family:Inter,_PingFang_SC,_Microsoft_YaHei,_sans-serif]"
          x="50"
          y="53"
          text-anchor="middle"
          :initial="false"
          :animate="isRevealed ? { opacity: 1, y: 53 } : { opacity: 0, y: 57 }"
          :transition="shouldReduceMotion ? { duration: 0 } : { duration: .3, delay: .76, ease: 'easeOut' }"
        >
          {{ recipeLabel }}
        </motion.text>
      </g>

      <g v-for="colour in colourWheelOrder" :key="colour">
        <circle
          class="stroke-[rgb(32_34_44_/_14%)] [stroke-width:.55]"
          :cx="nodeCoordinates[colour][0]"
          :cy="nodeCoordinates[colour][1]"
          r="6.9"
          :fill="swatchColours[colour]"
        />
        <text
          class="fill-white text-[3px] font-bold [font-family:Inter,_PingFang_SC,_Microsoft_YaHei,_sans-serif]"
          :x="nodeCoordinates[colour][0]"
          :y="nodeCoordinates[colour][1] + .8"
          text-anchor="middle"
        >
          {{ colourLabels[colour] }}
        </text>
      </g>
    </svg>
  </section>
</template>
