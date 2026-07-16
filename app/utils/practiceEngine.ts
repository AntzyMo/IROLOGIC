import type { ColourId, GradeResult, Mode, Question, System } from '~/types/practice'

import { colourLabels, recipesFor } from '~/data/colourRules'

const allColours = Object.keys(colourLabels) as readonly ColourId[]

const sameSet = (left: readonly ColourId[], right: readonly ColourId[]) => [...left].sort().join('|') === [...right].sort().join('|')

const chooseSystem = (mode: Mode, random: () => number): System => mode === 'mixed' ? (random() < 0.5 ? 'light' : 'pigment') : mode

export function createQuestion(mode: Mode, random: () => number = Math.random): Question {
  const system = chooseSystem(mode, random)
  const candidates = recipesFor(system)

  if (!candidates.length) {
    throw new Error(`没有 ${system} 规则可用于出题`)
  }

  const recipe = candidates[Math.floor(random() * candidates.length)]!
  const kind = random() < 0.5 ? 'formula-to-result' : 'result-to-inputs'

  return {
    id: `${system}-${kind}-${recipe.inputs.join('-')}`,
    system,
    kind,
    inputs: [...recipe.inputs],
    result: recipe.result,
    choices: [...allColours],
    correctAnswer: kind === 'formula-to-result' ? [recipe.result] : [...recipe.inputs],
    explanation: recipe.explanation
  }
}

export function gradeAnswer(question: Question, selected: readonly ColourId[]): GradeResult {
  return {
    isCorrect: sameSet(question.correctAnswer, selected),
    explanation: question.explanation
  }
}
