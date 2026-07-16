<script setup lang="ts">
  import { computed } from 'vue'
  import {
    Badge,
    Button,
    Card,
    CardContent,
    CardHeader,
    CardTitle
  } from 'moriui'
  import type { ColourId, GradeResult, Question } from '~/types/practice'

  import { colourLabels } from '~/data/colourRules'

  const props = defineProps<{ question: Question, feedback: GradeResult | null }>()
  const emit = defineEmits<{ check: [], next: [] }>()
  const selected = defineModel<ColourId[]>('selected', { required: true })
  const prompt = computed(() => props.question.kind === 'formula-to-result'
    ? `${props.question.inputs.map(id => colourLabels[id]).join(' + ')} = ？`
    : `请选择组成${colourLabels[props.question.result]}的颜色`)

  const visualColours = computed(() => props.question.kind === 'formula-to-result'
    ? props.question.inputs
    : [props.question.result])

  const swatchClasses: Record<ColourId, string> = {
    red: '[--swatch:#ff5c49]',
    green: '[--swatch:#b9dd32]',
    blue: '[--swatch:#647eff]',
    yellow: '[--swatch:#f5ca3e]',
    cyan: '[--swatch:#57d4df]',
    magenta: '[--swatch:#c36bd4]'
  }

  const materialClass = computed(() => props.question.system === 'light'
    ? 'rounded-full opacity-[.78] [mix-blend-mode:multiply] [filter:saturate(1.2)_brightness(1.08)] [box-shadow:0_0_1.35rem_color-mix(in_srgb,var(--swatch)_70%,transparent)]'
    : 'rounded-[.7rem_1rem_.8rem_1.1rem] [filter:saturate(.88)_contrast(1.04)] [box-shadow:inset_7px_-7px_13px_rgb(0_0_0_/_8%)]')

  function toggle(colour: ColourId) {
    selected.value = props.question.kind === 'result-to-inputs'
      ? (selected.value.includes(colour) ? selected.value.filter(id => id !== colour) : [...selected.value, colour])
      : [colour]
  }
</script>

<template>
  <Card class="question-card border-[rgb(32_34_44_/_12%)] bg-[rgb(255_255_255_/_45%)]" :data-system="question.system">
    <CardHeader>
      <Badge>{{ question.kind === 'formula-to-result' ? '猜结果' : '反推组成' }}</Badge>
      <CardTitle>{{ prompt }}</CardTitle>
    </CardHeader>
    <CardContent>
      <div class="mix-visual my-4 flex min-h-16 items-center" aria-hidden="true">
        <span
          v-for="colour in visualColours"
          :key="colour"
          class="block aspect-square w-15 -ml-[.7rem] first:ml-0 [background:var(--swatch)]"
          :class="[swatchClasses[colour], materialClass]"
        />
      </div>
      <div class="answer-grid mb-4 grid grid-cols-[repeat(auto-fit,minmax(5rem,1fr))] gap-3">
        <Button
          v-for="colour in question.choices"
          :key="colour"
          type="button"
          :aria-pressed="selected.includes(colour)"
          @click="toggle(colour)"
        >
          {{ colourLabels[colour] }}
        </Button>
      </div>
      <Button :disabled="!selected.length || !!feedback" @click="emit('check')">
        检查答案
      </Button>
      <p v-if="feedback" :class="feedback.isCorrect ? 'feedback-correct mt-4 text-[#587115]' : 'feedback-wrong mt-4 text-[#bc4032]'">
        {{ feedback.isCorrect ? '回答正确，将进入下一题。' : feedback.explanation }}
      </p>
      <Button v-if="feedback && !feedback.isCorrect" class="mt-3" @click="emit('next')">
        下一题
      </Button>
    </CardContent>
  </Card>
</template>
