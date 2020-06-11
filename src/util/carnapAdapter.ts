import { FormulaNode, TreeForm, JustificationMap } from '../typings/TreeState'
import { firstRow } from './nodes'
import { SequentNode } from '../typings/Checker'

export const convertToSequent = (
  { formulas: newFormulas, forest }: FormulaNode,
  justifications: JustificationMap,
  previousFormulas: TreeForm[] = []
): SequentNode => {
  const formulas = previousFormulas.concat(newFormulas)
  if (forest.length === 0) {
    return { label: convertFormulas(formulas), rule: '', forest: [] }
  } else {
    const [child] = forest
    if (child.nodeType === 'formulas') {
      const justification = justifications[firstRow(child)]
      const { rule } = justification
      const parentRow = Number(justification.parentRow)
      if (!validRow(parentRow)) {
        throw new Error(
          `Cited row must be a positive integer. Got "${parentRow}"`
        )
      }
      if (parentRow >= firstRow(child)) {
        throw new Error(
          `Row cited (${parentRow}) must be less than current row (${firstRow(
            child
          )}).`
        )
      }
      return {
        label: convertFormulas(formulas),
        rule: 'St',
        forest: [
          {
            label: rearrangeFormulas(formulas, parentRow),
            rule,
            forest: forest.map((node) =>
              convertToSequent(
                node as FormulaNode,
                justifications,
                formulas.filter((form) => !(form.row === parentRow))
              )
            ),
          },
        ],
      }
    } else if (child.nodeType === 'contradiction') {
      // We expect parentRow to be "<number>,<number>"
      const [row1, row2] = child.contradictoryRows.split(',').map(Number)
      if (![row1, row2].every(validRow)) {
        throw new Error(
          `Contradiction must cite 2 rows, separated by a comma. Got "${child.contradictoryRows}"`
        )
      }
      const [form1, form2] = formulas
        .filter((form) => [row1, row2].includes(form.row))
        // this sort is a hack to avoid parsing for negation symbol, which may vary
        .sort((a, b) => b.value.length - a.value.length)
      if (!(form1 && form2)) {
        throw new Error('Contradiction cites non-existent row')
      }
      const contradictionSequent: string = convertFormulas([
        form1,
        ...formulas.filter((form) => ![row1, row2].includes(form.row)),
        form2,
      ])
      return {
        label: convertFormulas(formulas),
        rule: 'St',
        forest: [
          {
            label: contradictionSequent,
            rule: 'Ax',
            forest: [{ label: '', rule: '', forest: [] }],
          },
        ],
      }
    } else if (child.nodeType === 'finished') {
      return {
        label: convertFormulas(formulas),
        rule: 'Lit',
        forest: [
          {
            label: '',
            rule: '',
            forest: [],
          },
        ],
      }
    } else {
      throw new Error('this was supposed to be exhaustive')
    }
  }
}

const rearrangeFormulas = (
  forms: TreeForm[],
  mainFormulaRow: number
): string => {
  const idx = forms.findIndex((form) => form.row === mainFormulaRow)
  const mainFormula = forms[idx]
  const formulasWithoutMain = forms.slice(0, idx).concat(forms.slice(idx + 1))
  const newList = [...formulasWithoutMain, mainFormula]
  return convertFormulas(newList)
}

const convertFormulas = (forms: TreeForm[]) => {
  return forms
    .map(({ value }) => value)
    .join(',')
    .concat(':|-:')
}

const validRow = (maybeRow: number): boolean => {
  return maybeRow > 0
}
