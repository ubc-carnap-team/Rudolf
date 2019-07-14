import { Formula } from '../typings/Formula'

export const printTerm = (term: Formula): string => {
  switch (term.type) {
    case 'ATOM':
      return term.name
    case 'AND':
      return `( ${printTerm(term.lhs)} /\\ ${printTerm(term.rhs)} )`
    case 'OR':
      return `( ${printTerm(term.lhs)} \\/ ${printTerm(term.rhs)} )`
    case 'NOT':
      return `~${printTerm(term.subTerm)}`
    default:
      console.error('unexpected term', term)
      throw new Error('unexpected term shape')
  }
}

export function parseFormula(subFormula: string): Formula {
  return { type: 'ATOM', name: subFormula }
}
