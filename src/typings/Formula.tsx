export type Formula = Atom | Conjunction | Disjunction | Negation

export type Atom = {
  type: 'ATOM'
  name: string
}
export type Conjunction = {
  type: 'AND'
  lhs: Formula
  rhs: Formula
}
export type Disjunction = {
  type: 'OR'
  lhs: Formula
  rhs: Formula
}
export type Negation = {
  type: 'NOT'
  subTerm: Formula
}
export const Or = (lhs: Formula, rhs: Formula): Disjunction => ({
  type: 'OR',
  lhs,
  rhs,
})
export const And = (lhs: Formula, rhs: Formula): Conjunction => ({
  type: 'AND',
  lhs,
  rhs,
})
export const Not = (subTerm: Formula): Negation => ({ type: 'NOT', subTerm })
export const Atom = (name: string): Atom => ({
  type: 'ATOM',
  name,
})
