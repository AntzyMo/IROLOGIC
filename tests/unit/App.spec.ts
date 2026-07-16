import { mountSuspended } from '@nuxt/test-utils/runtime'

import App from '~/app.vue'

it('挂载单页应用根组件', async () => {
  const wrapper = await mountSuspended(App)
  expect(wrapper.exists()).toBe(true)
})

it('在首屏导航保留文字品牌标识', async () => {
  const wrapper = await mountSuspended(App)

  const brand = wrapper.get('nav strong')
  expect(brand.text()).toBe('IROLOGIC.')
  expect(brand.find('img').exists()).toBe(false)
})

it('按首屏、练习和合并速查区组成单页', async () => {
  const wrapper = await mountSuspended(App)

  expect(wrapper.get('h1').text()).toContain('通过观察，理解色彩')
  expect(wrapper.get('#practice').exists()).toBe(true)
  expect(wrapper.text()).toContain('色彩规律速查')
  expect(wrapper.text()).not.toContain('01 / 观察')
  expect(wrapper.text()).not.toContain('速查表')
})

it('在页脚展示版权信息和 GitHub 仓库链接', async () => {
  const wrapper = await mountSuspended(App)

  const footer = wrapper.get('footer')
  const repositoryLink = footer.get('a[aria-label="在 GitHub 查看 IROLOGIC 仓库"]')

  expect(footer.text()).toContain('© 2026 AntzyMo')
  expect(repositoryLink.attributes('href')).toBe('https://github.com/AntzyMo/IROLOGIC')
  expect(repositoryLink.attributes('target')).toBe('_blank')
  expect(repositoryLink.attributes('rel')).toBe('noreferrer')
  expect(footer.find('p[aria-hidden="true"]').exists()).toBe(false)
  expect(repositoryLink.classes()).not.toContain('border')
  expect(repositoryLink.find('svg').exists()).toBe(true)
})
