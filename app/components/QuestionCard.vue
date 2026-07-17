<script setup lang="ts">
  import { computed } from 'vue'
  import { Button } from 'moriui'
  import type { ColourId, GradeResult, Question } from '~/types/practice'

  import { colourLabels, colourWheelOrder } from '~/data/colourRules'

  const props = defineProps<{
    question: Question
    selected: readonly ColourId[]
    feedback: GradeResult | null
  }>()

  const emit = defineEmits<{
    answer: [colour: ColourId]
    next: []
  }>()

  const swatchColours: Readonly<Record<ColourId, string>> = {
    red: '#ef5148',
    yellow: '#f1ca3d',
    green: '#9fca4e',
    cyan: '#62cfda',
    blue: '#637bed',
    magenta: '#bc66c6'
  }

  const selectionCount = computed(() => props.question.correctAnswer.length)
  const prompt = computed(() => props.question.kind === 'formula-to-result'
    ? `${props.question.inputs.map(colour => colourLabels[colour]).join(' + ')} = ？`
    : `怎样得到${colourLabels[props.question.result]}？`)

  const instruction = computed(() => `请选择 ${selectionCount.value} 张色卡`)

  const feedbackCopy = computed(() => {
    if (!props.feedback)
      return '右侧参考盘会在回答后展示正确配方。'

    return props.feedback.isCorrect
      ? '回答正确，完整配方已在右侧展开。'
      : '正确配方已在右侧标出，再观察一次颜色的位置。'
  })

  function answerState(colour: ColourId) {
    if (!props.feedback)
      return props.selected.includes(colour) ? 'selected' : 'idle'

    if (props.question.correctAnswer.includes(colour))
      return 'correct'

    if (props.selected.includes(colour))
      return 'incorrect'

    return 'idle'
  }
</script>

<template>
  <section class="min-w-0">
    <div class="grid grid-cols-[minmax(17rem,.85fr)_minmax(22rem,1.15fr)] items-stretch gap-[clamp(2rem,7vw,6rem)] py-[clamp(.5rem,2vw,1.5rem)] max-[46rem]:grid-cols-[minmax(0,1fr)] max-[46rem]:gap-5 max-[46rem]:py-[1.15rem]">
      <section class="flex min-w-0 flex-col justify-center max-[46rem]:order-1" aria-labelledby="practice-question">
        <p class="m-0 mb-[.8rem] text-sm text-[rgb(32_34_44_/_58%)]">
          基础配方
        </p>
        <h2 id="practice-question" class="m-0 text-[clamp(2.1rem,4vw,4.15rem)] leading-none tracking-[-.06em] text-[var(--ink)]">
          {{ prompt }}
        </h2>
        <p class="mt-[1.1rem] mb-[1.45rem] text-[.94rem] text-[rgb(32_34_44_/_66%)]">
          {{ instruction }}
        </p>

        <div class="grid grid-cols-3 gap-[.65rem] max-[25rem]:grid-cols-2" aria-label="颜色答案">
          <Button
            v-for="colour in colourWheelOrder"
            :key="colour"
            type="button"
            class="inline-flex min-h-12 items-center justify-start gap-[.55rem] rounded-[.85rem] border border-[rgb(32_34_44_/_12%)] bg-[rgb(255_255_255_/_46%)] text-sm font-[650] text-[var(--ink)] shadow-none transition-[border-color,background-color,transform] duration-[180ms] ease-[ease] enabled:hover:-translate-y-px enabled:hover:border-[rgb(32_34_44_/_36%)] enabled:hover:bg-[rgb(255_255_255_/_78%)] focus-visible:outline-2 focus-visible:outline-[var(--ink)] focus-visible:outline-offset-3 disabled:cursor-default disabled:opacity-100 data-[answer-state=selected]:border-[rgb(32_34_44_/_74%)] data-[answer-state=selected]:bg-[rgb(255_255_255_/_84%)] data-[answer-state=correct]:border-[rgb(32_34_44_/_74%)] data-[answer-state=correct]:bg-[rgb(255_255_255_/_84%)] data-[answer-state=incorrect]:border-[rgb(188_73_68_/_65%)] data-[answer-state=incorrect]:bg-[rgb(255_234_232_/_78%)]"
            :data-colour="colour"
            :data-answer-state="answerState(colour)"
            :aria-pressed="selected.includes(colour)"
            :disabled="feedback !== null"
            @click="emit('answer', colour)"
          >
            <span class="h-[.95rem] w-[.95rem] shrink-0 rounded-full border border-[rgb(32_34_44_/_12%)]" :style="{ backgroundColor: swatchColours[colour] }" aria-hidden="true" />
            <span>{{ colourLabels[colour] }}</span>
          </Button>
        </div>

        <div class="mt-6 flex min-h-18 items-center justify-between gap-4 border-t border-[rgb(32_34_44_/_10%)] text-sm text-[rgb(32_34_44_/_70%)] max-[25rem]:flex-col max-[25rem]:items-start" :data-feedback="feedback?.isCorrect ? 'correct' : feedback ? 'incorrect' : 'pending'" aria-live="polite">
          <p class="my-4">
            {{ feedbackCopy }}
          </p>
          <Button
            v-if="feedback"
            type="button"
            class="shrink-0 rounded-[.75rem] bg-[var(--ink)] text-[var(--paper)] shadow-none"
            @click="emit('next')"
          >
            下一题
          </Button>
        </div>
      </section>

      <ColourReferenceWheel :question="question" :feedback="feedback" />
    </div>
  </section>
</template>
