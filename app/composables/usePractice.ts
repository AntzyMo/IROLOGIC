import { readonly, shallowRef } from 'vue'
import type { ColourId } from '~/types/practice'

import { createQuestion, gradeAnswer } from '~/utils/practiceEngine'

export function usePractice({ random = Math.random }: { random?: () => number } = {}) {
  const question = shallowRef(createQuestion('mixed', random))
  const selected = shallowRef<ColourId[]>([])
  const feedback = shallowRef<ReturnType<typeof gradeAnswer> | null>(null)

  const resetAnswer = () => {
    selected.value = []
    feedback.value = null
  }

  const select = (colour: ColourId) => {
    if (feedback.value)
      return

    if (question.value.kind === 'formula-to-result') {
      selected.value = [colour]
    } else {
      selected.value = selected.value.includes(colour)
        ? selected.value.filter(id => id !== colour)
        : [...selected.value, colour]
    }

    if (selected.value.length !== question.value.correctAnswer.length)
      return

    feedback.value = gradeAnswer(question.value, selected.value)
  }

  const next = () => {
    question.value = createQuestion('mixed', random)
    resetAnswer()
  }

  return {
    question: readonly(question),
    selected: readonly(selected),
    feedback: readonly(feedback),
    select,
    next
  }
}
