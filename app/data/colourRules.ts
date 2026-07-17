import type { ColourId, Recipe, System } from '~/types/practice'

export const colourLabels: Readonly<Record<ColourId, string>> = {
  red: '红',
  green: '绿',
  blue: '蓝',
  yellow: '黄',
  cyan: '青',
  magenta: '品红'
}

export const colourWheelOrder: readonly ColourId[] = [
  'red',
  'yellow',
  'green',
  'cyan',
  'blue',
  'magenta'
]

export const recipes: readonly Recipe[] = [
  { system: 'light', inputs: ['red', 'green'], result: 'yellow', explanation: '红光与绿光叠加，形成黄光。' },
  { system: 'light', inputs: ['green', 'blue'], result: 'cyan', explanation: '绿光与蓝光叠加，形成青光。' },
  { system: 'light', inputs: ['red', 'blue'], result: 'magenta', explanation: '红光与蓝光叠加，形成品红光。' },
  { system: 'pigment', inputs: ['yellow', 'cyan'], result: 'green', explanation: '黄色与青色颜料混合，形成绿色。' },
  { system: 'pigment', inputs: ['cyan', 'magenta'], result: 'blue', explanation: '青色与品红颜料混合，形成蓝色。' },
  { system: 'pigment', inputs: ['magenta', 'yellow'], result: 'red', explanation: '品红与黄色颜料混合，形成红色。' }
]

export const recipesFor = (system: System): readonly Recipe[] => recipes.filter(recipe => recipe.system === system)
