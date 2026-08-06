import confetti from 'canvas-confetti'
import { useReducedMotion } from 'motion-v'
import { onUnmounted, shallowRef, watch } from 'vue'

const celebrationColours = ['#ef5148', '#f1ca3d', '#9fca4e', '#62cfda', '#637bed', '#bc66c6']

/**
 * 成功庆祝特效（canvas-confetti 全屏彩屑）。
 *  调用 celebrate() 一次触发一次庆祝；遵循减少动态偏好时不发射；卸载时清理画布。
 */
export function useSuccessCelebration() {
  const signal = shallowRef<number | null>(null)
  const shouldReduceMotion = useReducedMotion()

  const celebrate = () => {
    // 单调递增信号：与组件时代的 props 契约一致，挂载后首次调用即触发
    signal.value = (signal.value ?? 0) + 1
  }

  watch(signal, value => {
    if (value === null || shouldReduceMotion.value)
      return

    confetti({
      particleCount: 100,
      spread: 100,
      startVelocity: 45,
      ticks: 200,
      origin: { x: 0.5, y: 0.62 },
      colors: celebrationColours,
      zIndex: 100
    })
  })

  onUnmounted(() => confetti.reset())

  return { celebrate }
}
