export type Term = Atom | Conjunction | Disjunction | Negation

export type Atom = {
  type: 'ATOM'
  name: string
}
export type Conjunction = {
  type: 'AND'
  lhs: Term
  rhs: Term
}
export type Disjunction = {
  type: 'OR'
  lhs: Term
  rhs: Term
}
export type Negation = {
  type: 'NOT'
  subTerm: Term
}
export const Or = (lhs: Term, rhs: Term): Disjunction => ({
  type: 'OR',
  lhs,
  rhs,
})
export const And = (lhs: Term, rhs: Term): Conjunction => ({
  type: 'AND',
  lhs,
  rhs,
})
export const Not = (subTerm: Term): Negation => ({ type: 'NOT', subTerm })
export const Atom = (name: string): Atom => ({
  type: 'ATOM',
  name,
})
export const printTerm = (term: Term): string => {
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
