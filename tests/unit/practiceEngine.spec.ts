import type { ColourId } from '~/types/practice'

import { recipes } from '~/data/colourRules'
import { createQuestion, gradeAnswer } from '~/utils/practiceEngine'

it('光模式的第一题是红加绿得到黄', () => {
  expect(createQuestion('light', () => 0)).toMatchObject({ system: 'light', kind: 'formula-to-result', inputs: ['red', 'green'], correctAnswer: ['yellow'] })
})

it('颜料模式的第一题是黄加青得到绿', () => {
  expect(createQuestion('pigment', () => 0)).toMatchObject({ system: 'pigment', inputs: ['yellow', 'cyan'], correctAnswer: ['green'] })
})

it('混合模式依照随机值选择光或颜料规则', () => {
  expect(createQuestion('mixed', () => 0).system).toBe('light')
  expect(createQuestion('mixed', () => 0.9).system).toBe('pigment')
})

it('规则只有六条双色配方，且不产生白色或黑色选项', () => {
  expect(recipes).toHaveLength(6)
  expect(recipes.every(recipe => recipe.inputs.length === 2)).toBe(true)
  expect(recipes.map(recipe => recipe.result)).not.toEqual(expect.arrayContaining(['white', 'black']))
  expect(createQuestion('light', () => 0).choices).toEqual(['red', 'green', 'blue', 'yellow', 'cyan', 'magenta'])
})

it('反推组成题不受选择顺序影响', () => {
  const question = createQuestion('light', () => 0.6)
  expect(question.kind).toBe('result-to-inputs')
  expect(gradeAnswer(question, ['blue', 'green']).isCorrect).toBe(true)
})

it('修改返回题目的数组不会污染规则或后续题目', () => {
  const question = createQuestion('light', () => 0)
  const mutableInputs = question.inputs as unknown as ColourId[]
  const mutableChoices = question.choices as unknown as ColourId[]
  const mutableAnswer = question.correctAnswer as unknown as ColourId[]

  mutableInputs.push('blue')
  mutableChoices.splice(0, 1)
  mutableAnswer[0] = 'blue'

  expect(recipes[0]?.inputs).toEqual(['red', 'green'])
  expect(createQuestion('light', () => 0)).toMatchObject({
    inputs: ['red', 'green'],
    choices: ['red', 'green', 'blue', 'yellow', 'cyan', 'magenta'],
    correctAnswer: ['yellow']
  })
})
