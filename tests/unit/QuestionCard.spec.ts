import { enableAutoUnmount } from '@vue/test-utils'
import { mountSuspended } from '@nuxt/test-utils/runtime'

import { createQuestion } from '~/utils/practiceEngine'
import QuestionCard from '~/components/QuestionCard.vue'

enableAutoUnmount(afterEach)

const question = createQuestion('light', () => 0) // 红 + 绿 = 黄,formula-to-result
const correctFeedback = { isCorrect: true, explanation: '红光与绿光叠加，形成黄光。' }

it('未作答时显示色彩盘（两栏布局）', async () => {
  const wrapper = await mountSuspended(QuestionCard, {
    props: { question, selected: [], feedback: null },
    attachTo: document.body
  })

  expect(wrapper.get('[data-recipe-animation]').isVisible()).toBe(true)
  expect(wrapper.get('section.grid').classes()).not.toContain('grid-cols-1')
})

it('作答后显示色彩盘并展开配方', async () => {
  const wrapper = await mountSuspended(QuestionCard, {
    props: { question, selected: ['yellow'], feedback: correctFeedback },
    attachTo: document.body
  })

  expect(wrapper.get('[data-recipe-animation]').isVisible()).toBe(true)
  expect(wrapper.get('[data-recipe-animation]').attributes('data-recipe-animation')).toBe('light-formula-to-result-red-green')
  expect(wrapper.get('section.grid').classes()).not.toContain('grid-cols-1')
})
