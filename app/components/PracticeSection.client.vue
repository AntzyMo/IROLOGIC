<script setup lang="ts">
  import { ref, watch } from 'vue'
  import { usePractice } from '~/composables/usePractice'

  const props = defineProps<{ random?: () => number }>()
  const {
    question,
    selected,
    feedback,
    select,
    next
  } = usePractice({ random: props.random })

  const celebrationKey = ref<number | null>(null)

  watch(feedback, (value, previous) => {
    if (value?.isCorrect && !previous)
      celebrationKey.value = (celebrationKey.value ?? 0) + 1
  })
</script>

<template>
  <section class="practice-section w-[min(100%_-_40px,1180px)] mx-auto py-28 max-[720px]:w-[min(100%_-_28px,1180px)] max-[720px]:py-20">
    <SuccessCelebration :celebrate="celebrationKey" />
    <QuestionCard
      :question="question"
      :selected="selected"
      :feedback="feedback"
      @answer="select"
      @next="next"
    />
  </section>
</template>
