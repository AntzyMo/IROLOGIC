import { afterEach, beforeEach, vi } from 'vitest'

import { usePractice } from '~/composables/usePractice'

function createRandomSequence(values: number[]) {
  let index = 0
  return () => values[index++] ?? 0
}

beforeEach(() => {
  vi.useFakeTimers()
})

afterEach(() => {
  vi.useRealTimers()
})

it('答错后保留题目，直到手动下一题', () => {
  const practice = usePractice({ random: () => 0 })
  const initialId = practice.question.value!.id

  practice.selected.value = ['blue']
  practice.check()

  expect(practice.feedback.value?.isCorrect).toBe(false)
  expect(practice.question.value?.id).toBe(initialId)

  practice.next()

  expect(practice.feedback.value).toBeNull()
})

it('答对后在 650ms 自动进入下一题', () => {
  const practice = usePractice({ random: createRandomSequence([0, 0, 0, 0, 0.4, 0]) })
  const initialId = practice.question.value!.id

  practice.selected.value = [...practice.question.value!.correctAnswer]
  practice.check()

  vi.advanceTimersByTime(649)
  expect(practice.question.value?.id).toBe(initialId)
  expect(practice.feedback.value?.isCorrect).toBe(true)

  vi.advanceTimersByTime(1)
  expect(practice.question.value?.id).not.toBe(initialId)
  expect(practice.feedback.value).toBeNull()
})

it('手动下一题会取消重复正确检查留下的全部自动换题', () => {
  const practice = usePractice({ random: createRandomSequence([0, 0, 0, 0, 0.3, 0, 0, 0.6, 0]) })

  practice.selected.value = [...practice.question.value!.correctAnswer]
  practice.check()
  practice.check()
  practice.next()
  const manualNextId = practice.question.value!.id

  vi.advanceTimersByTime(650)

  expect(practice.question.value?.id).toBe(manualNextId)
})

it('dispose 会取消重复正确检查留下的全部自动换题', () => {
  const practice = usePractice({ random: createRandomSequence([0, 0, 0, 0, 0.4, 0]) })
  const initialId = practice.question.value!.id

  practice.selected.value = [...practice.question.value!.correctAnswer]
  practice.check()
  practice.check()
  practice.dispose()

  vi.advanceTimersByTime(650)

  expect(practice.question.value?.id).toBe(initialId)
  expect(practice.feedback.value?.isCorrect).toBe(true)
})
