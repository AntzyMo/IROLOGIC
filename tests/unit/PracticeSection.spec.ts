import { mountSuspended } from '@nuxt/test-utils/runtime'

import PracticeSection from '~/components/PracticeSection.client.vue'

it('使用左题右盘布局，不显示阶段切换或检查答案', async () => {
  const wrapper = await mountSuspended(PracticeSection, { props: { random: () => 0 } })

  expect(wrapper.find('[data-recipe-animation="idle"]').exists()).toBe(true)
  expect(wrapper.text()).not.toContain('推导结果')
  expect(wrapper.text()).not.toContain('01 / 06')
  expect(wrapper.text()).not.toContain('色彩参考盘')
  expect(wrapper.text()).not.toContain('回答后显示配方')
  expect(wrapper.text()).not.toContain('观察')
  expect(wrapper.text()).not.toContain('选择结果')
  expect(wrapper.text()).not.toContain('反推原料')
  expect(wrapper.text()).not.toContain('检查答案')
  expect(wrapper.findAll('[data-colour]')).toHaveLength(6)
})

it('正向练习选择黄后锁定色卡并展示正确配方动画', async () => {
  const wrapper = await mountSuspended(PracticeSection, { props: { random: () => 0 } })

  await wrapper.find('[data-colour="yellow"]').trigger('click')

  expect(wrapper.get('[data-colour="yellow"]').attributes('data-answer-state')).toBe('correct')
  expect(wrapper.get('[data-colour="yellow"]').attributes('disabled')).toBeDefined()
  expect(wrapper.get('[data-recipe-animation]').attributes('data-recipe-animation')).toBe('light-formula-to-result-red-green')
  expect(wrapper.text()).toContain('回答正确')
})

it('反推练习选满两种原料后即时判定', async () => {
  const random = vi.fn()
    .mockReturnValueOnce(0)
    .mockReturnValueOnce(0)
    .mockReturnValueOnce(0.9)
  const wrapper = await mountSuspended(PracticeSection, { props: { random } })

  await wrapper.find('[data-colour="red"]').trigger('click')
  expect(wrapper.get('[data-colour="red"]').attributes('data-answer-state')).toBe('selected')
  expect(wrapper.find('[data-recipe-animation="idle"]').exists()).toBe(true)

  await wrapper.find('[data-colour="green"]').trigger('click')

  expect(wrapper.text()).toContain('红 + 绿 = 黄')
  expect(wrapper.get('[data-colour="red"]').attributes('data-answer-state')).toBe('correct')
  expect(wrapper.get('[data-colour="green"]').attributes('data-answer-state')).toBe('correct')
})

it('答错后仍显示正确配方，并可用下一题重置作答状态', async () => {
  const wrapper = await mountSuspended(PracticeSection, { props: { random: () => 0 } })

  await wrapper.find('[data-colour="blue"]').trigger('click')

  expect(wrapper.get('[data-colour="blue"]').attributes('data-answer-state')).toBe('incorrect')
  expect(wrapper.get('[data-recipe-animation]').attributes('data-recipe-animation')).toBe('light-formula-to-result-red-green')
  expect(wrapper.text()).toContain('正确配方已在右侧标出')

  await wrapper.findAll('button').find(button => button.text() === '下一题')!.trigger('click')

  expect(wrapper.find('[data-recipe-animation="idle"]').exists()).toBe(true)
  expect(wrapper.get('[data-colour="blue"]').attributes('data-answer-state')).toBe('idle')
  expect(wrapper.get('[data-colour="blue"]').attributes('disabled')).toBeUndefined()
})
