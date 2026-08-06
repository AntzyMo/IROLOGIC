import { useReducedMotion } from 'motion-v'
import { defineComponent, h, nextTick, ref } from 'vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'

import { useSuccessCelebration } from '~/composables/useSuccessCelebration'

const { confettiMock, resetMock } = vi.hoisted(() => {
  const confettiMock = vi.fn()
  const resetMock = vi.fn()
  confettiMock.reset = resetMock
  return { confettiMock, resetMock }
})

vi.mock('canvas-confetti', () => ({ default: confettiMock }))

vi.mock('motion-v', async importOriginal => {
  const actual = await importOriginal<typeof import('motion-v')>()
  return { ...actual, useReducedMotion: vi.fn(() => ref(false)) }
})

const reducedMotionMock = vi.mocked(useReducedMotion)

// 宿主组件：提供组件上下文以承载 watch 与 onUnmounted，click 触发 celebrate
const Host = defineComponent({
  setup() {
    const { celebrate } = useSuccessCelebration()
    return { celebrate }
  },
  render() {
    return h('button', { onClick: () => this.celebrate() }, '庆祝')
  }
})

beforeEach(() => {
  confettiMock.mockClear()
  resetMock.mockClear()
  reducedMotionMock.mockReturnValue(ref(false))
})

it('触发 celebrate 时从屏幕中央偏下爆发六色彩屑', async () => {
  const wrapper = await mountSuspended(Host)

  await wrapper.find('button').trigger('click')
  await nextTick()

  expect(confettiMock).toHaveBeenCalledOnce()
  expect(confettiMock).toHaveBeenCalledWith(expect.objectContaining({
    origin: { x: 0.5, y: 0.62 },
    particleCount: 100,
    spread: 100,
    startVelocity: 45,
    ticks: 200,
    zIndex: 100,
    colors: expect.arrayContaining(['#ef5148', '#f1ca3d', '#9fca4e', '#62cfda', '#637bed', '#bc66c6'])
  }))
})

it('从未触发不发射彩屑', async () => {
  await mountSuspended(Host)
  await nextTick()

  expect(confettiMock).not.toHaveBeenCalled()
})

it('遵循减少动态偏好时不发射彩屑', async () => {
  reducedMotionMock.mockReturnValue(ref(true))
  const wrapper = await mountSuspended(Host)

  await wrapper.find('button').trigger('click')
  await nextTick()

  expect(confettiMock).not.toHaveBeenCalled()
})

it('卸载时清理画布', async () => {
  const wrapper = await mountSuspended(Host)

  await wrapper.find('button').trigger('click')
  await nextTick()
  expect(confettiMock).toHaveBeenCalledOnce()

  wrapper.unmount()

  expect(resetMock).toHaveBeenCalledOnce()
})
