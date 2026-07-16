export type Mode = 'light' | 'pigment' | 'mixed'

export type System = Exclude<Mode, 'mixed'>

export type ColourId = 'red' | 'green' | 'blue' | 'yellow' | 'cyan' | 'magenta'

export type QuestionKind = 'formula-to-result' | 'result-to-inputs'

export interface Recipe {
  readonly system: System
  readonly inputs: readonly [ColourId, ColourId]
  readonly result: ColourId
  readonly explanation: string
}

export interface Question {
  readonly id: string
  readonly system: System
  readonly kind: QuestionKind
  readonly inputs: readonly ColourId[]
  readonly result: ColourId
  readonly choices: readonly ColourId[]
  readonly correctAnswer: readonly ColourId[]
  readonly explanation: string
}

export interface GradeResult {
  readonly isCorrect: boolean
  readonly explanation: string
}
