import { usePractice } from '~/composables/usePractice'

it('公式题点选一个答案后立即判定', () => {
  const practice = usePractice({ random: () => 0 })

  expect(practice.question.value.kind).toBe('formula-to-result')

  practice.select('yellow')

  expect(practice.selected.value).toEqual(['yellow'])
  expect(practice.feedback.value?.isCorrect).toBe(true)
})

it('反推题选满两种原料后才判定，并允许在判定前取消选择', () => {
  const random = vi.fn()
    .mockReturnValueOnce(0)
    .mockReturnValueOnce(0)
    .mockReturnValueOnce(0.9)
  const practice = usePractice({ random })

  expect(practice.question.value.kind).toBe('result-to-inputs')

  practice.select('red')
  practice.select('red')
  expect(practice.selected.value).toEqual([])

  practice.select('red')
  expect(practice.feedback.value).toBeNull()

  practice.select('green')
  expect(practice.feedback.value?.isCorrect).toBe(true)
})

it('下一组会清空选择与反馈并继续使用内部混合出题', () => {
  const practice = usePractice({ random: () => 0 })
  practice.select('yellow')

  practice.next()

  expect(practice.selected.value).toEqual([])
  expect(practice.feedback.value).toBeNull()
  expect(practice.question.value.system).toBe('light')
})
