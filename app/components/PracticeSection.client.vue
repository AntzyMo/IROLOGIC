<script setup lang="ts">
  import { onBeforeUnmount } from 'vue'

  import { usePractice } from '~/composables/usePractice'

  const props = defineProps<{ random?: () => number }>()
  const {
    mode,
    question,
    selected,
    feedback,
    check,
    next,
    dispose
  } = usePractice({ random: props.random })

  onBeforeUnmount(dispose)
</script>

<template>
  <section class="practice-section w-[min(100%_-_40px,720px)] mx-auto py-28 max-[720px]:w-[min(100%_-_28px,720px)] max-[720px]:py-20">
    <ModeSwitch v-model:mode="mode" />
    <QuestionCard
      v-model:selected="selected"
      :question="question"
      :feedback="feedback"
      @check="check"
      @next="next"
    />
  </section>
</template>
