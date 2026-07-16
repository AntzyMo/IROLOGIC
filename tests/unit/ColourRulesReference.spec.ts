import { mountSuspended } from '@nuxt/test-utils/runtime'

import ColourRulesReference from '~/components/ColourRulesReference.vue'

it('在光和颜料之间切换合并后的规律速查区', async () => {
  const wrapper = await mountSuspended(ColourRulesReference)

  expect(wrapper.get('h2').text()).toBe('色彩规律速查')
  expect(wrapper.text()).toContain('红 + 绿')
  expect(wrapper.text()).not.toContain('黄 + 青')
  expect(wrapper.findAll('[data-recipe-card]')).toHaveLength(3)

  await wrapper.findAll('button').find(button => button.text() === '颜料')!.trigger('click')

  expect(wrapper.attributes('data-system')).toBe('pigment')
  expect(wrapper.text()).toContain('黄 + 青')
  expect(wrapper.findAll('button').map(button => button.text())).not.toContain('混合')
})
