import { nextTick, ref } from 'vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'

import SuccessCelebration from '~/components/SuccessCelebration.client.vue'
import { useReducedMotion } from 'motion-v'

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

beforeEach(() => {
  confettiMock.mockClear()
  resetMock.mockClear()
  reducedMotionMock.mockReturnValue(ref(false))
})

it('信号变化时从屏幕中央偏下爆发六色彩屑', async () => {
  const wrapper = await mountSuspended(SuccessCelebration, { props: { celebrate: null } })

  await wrapper.setProps({ celebrate: 1 })
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

it('从未触发的信号不发射彩屑', async () => {
  await mountSuspended(SuccessCelebration, { props: { celebrate: null } })
  await nextTick()

  expect(confettiMock).not.toHaveBeenCalled()
})

it('遵循减少动态偏好时不发射彩屑', async () => {
  reducedMotionMock.mockReturnValue(ref(true))
  const wrapper = await mountSuspended(SuccessCelebration, { props: { celebrate: null } })

  await wrapper.setProps({ celebrate: 1 })
  await nextTick()

  expect(confettiMock).not.toHaveBeenCalled()
})

it('卸载时清理画布', async () => {
  const wrapper = await mountSuspended(SuccessCelebration, { props: { celebrate: null } })

  await wrapper.setProps({ celebrate: 1 })
  await nextTick()
  expect(confettiMock).toHaveBeenCalledOnce()

  wrapper.unmount()

  expect(resetMock).toHaveBeenCalledOnce()
})
