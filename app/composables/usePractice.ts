import { readonly, shallowRef, watch } from 'vue'
import type { ColourId, Mode } from '~/types/practice'

import { createQuestion, gradeAnswer } from '~/utils/practiceEngine'

export function usePractice({ random = Math.random }: { random?: () => number } = {}) {
  const mode = shallowRef<Mode>('mixed')
  const question = shallowRef(createQuestion(mode.value, random))
  const selected = shallowRef<ColourId[]>([])
  const feedback = shallowRef<ReturnType<typeof gradeAnswer> | null>(null)
  const autoNextTimers = new Set<ReturnType<typeof setTimeout>>()

  const clearAutoNextTimers = () => {
    for (const timer of autoNextTimers) {
      if (timer !== undefined)
        clearTimeout(timer)
    }
    autoNextTimers.clear()
  }

  const next = (nextMode = mode.value) => {
    clearAutoNextTimers()
    question.value = createQuestion(nextMode, random)
    selected.value = []
    feedback.value = null
  }

  const check = () => {
    const result = gradeAnswer(question.value, selected.value)
    feedback.value = result

    if (result.isCorrect) {
      const timer = setTimeout(() => {
        autoNextTimers.delete(timer)
        next()
      }, 650)
      autoNextTimers.add(timer)
    }
  }

  const dispose = () => {
    clearAutoNextTimers()
  }

  watch(mode, () => next())

  return { mode, question: readonly(question), selected, feedback: readonly(feedback), check, next, dispose }
}
