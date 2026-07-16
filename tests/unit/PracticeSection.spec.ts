import { mountSuspended } from '@nuxt/test-utils/runtime'

import PracticeSection from '~/components/PracticeSection.client.vue'

it('切换颜料模式后当前题使用颜料规则', async () => {
  const wrapper = await mountSuspended(PracticeSection, { props: { random: () => 0 } })

  await wrapper.findAll('button').find(button => button.text().includes('颜料'))!.trigger('click')

  expect(wrapper.find('.question-card').attributes('data-system')).toBe('pigment')
  expect(wrapper.text()).toContain('黄 + 青 = ？')
})

it('光模式选择蓝并检查后显示中文解析和下一题', async () => {
  const wrapper = await mountSuspended(PracticeSection, { props: { random: () => 0 } })

  await wrapper.findAll('button').find(button => button.text() === '蓝')!.trigger('click')
  await wrapper.findAll('button').find(button => button.text() === '检查答案')!.trigger('click')

  expect(wrapper.text()).toContain('红光与绿光叠加')
  expect(wrapper.text()).toContain('下一题')
})
