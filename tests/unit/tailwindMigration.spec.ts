import { resolve } from 'node:path'
import { readFile } from 'node:fs/promises'
import { describe, expect, it } from 'vitest'

const componentFiles = [
  'HeroSection.vue',
  'PracticeSection.client.vue',
  'ModeSwitch.vue',
  'QuestionCard.vue'
]

describe('landing Page 的 Tailwind 迁移', () => {
  it('目标组件不再包含私有样式块', async () => {
    const componentDirectory = resolve(process.cwd(), 'app/components')
    const contents = await Promise.all(componentFiles.map(file => readFile(resolve(componentDirectory, file), 'utf8')))

    expect(contents.join('\n')).not.toMatch(/<style\b/i)
  })

  it('首屏不会裁剪向右延伸的 RGB 色圈', async () => {
    const hero = await readFile(resolve(process.cwd(), 'app/components/HeroSection.vue'), 'utf8')

    expect(hero).not.toContain('overflow-hidden')
  })

  it('首屏至少占满一个视口，观察段需要向下滚动才出现', async () => {
    const hero = await readFile(resolve(process.cwd(), 'app/components/HeroSection.vue'), 'utf8')

    expect(hero).toContain('min-h-svh')
  })

  it('首屏 RGB 色圈与底部保持安全距离', async () => {
    const hero = await readFile(resolve(process.cwd(), 'app/components/HeroSection.vue'), 'utf8')

    expect(hero).toContain('bottom-[clamp(3rem,5vw,6rem)]')
  })

  it('移动端色圈不超出视口右侧', async () => {
    const hero = await readFile(resolve(process.cwd(), 'app/components/HeroSection.vue'), 'utf8')

    expect(hero).toContain('max-[720px]:right-0')
    expect(hero).not.toContain('max-[720px]:right-[-5rem]')
  })
})
