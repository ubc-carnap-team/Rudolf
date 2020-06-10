import {
  FormulaNode,
  TreeForm,
  TreeNode,
  JustificationMap,
} from '../typings/TreeState'
import { firstRow } from './nodes'
import { SequentNode } from '../typings/Sequent'

export const convertToSequent = (
  node: TreeNode,
  justifications: JustificationMap
): SequentNode => {
  switch (node.nodeType) {
    case 'formulas':
      return convertToSequentFN(node, [], justifications)
    case 'finished':
    case 'contradiction':
      throw new Error('TODO')
    default:
      throw new Error('invalid node')
  }
}

const convertToSequentFN = (
  { formulas: newFormulas, forest }: FormulaNode,
  previousFormulas: TreeForm[],
  justifications: JustificationMap
): SequentNode => {
  const formulas = previousFormulas.concat(newFormulas)
  if (forest.length === 0) {
    return { label: formulasToSequent(formulas), rule: '', forest: [] }
  } else {
    const [child] = forest
    if (child.nodeType === 'formulas') {
      const { rule, parentRow } = justifications[firstRow(child)]
      return {
        label: formulasToSequent(formulas),
        rule: 'St',
        forest: [
          {
            // TODO Handle case where row string isn't a number
            label: rearrangeFormulas(formulas, Number(parentRow)),
            rule,
            forest: forest.map((node) =>
              convertToSequentFN(
                node as FormulaNode,
                formulas.filter((form) => !(form.row === Number(parentRow))),
                justifications
              )
            ),
          },
        ],
      }
    } else if (child.nodeType === 'contradiction') {
      // Expect parentRow to be "<number>,<number>"
      // TODO Handle case where it isn't
      const [row1, row2] = child.contradictoryRows.split(',').map(Number)
      const [form1, form2] = formulas
        .filter((form) => [row1, row2].includes(form.row))
        // this sort is a hack to avoid parsing for negation symbol, which may vary
        .sort((a, b) => b.value.length - a.value.length)
      if (!(form1 || form2)) {
        console.error(form1, form2)
      }
      const contradictionSequent: string = formulasToSequent([
        form1,
        ...formulas.filter((form) => ![row1, row2].includes(form.row)),
        form2,
      ])
      return {
        label: formulasToSequent(formulas),
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
        label: formulasToSequent(formulas),
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
  return formulasToSequent(newList)
}

const formulasToSequent = (forms: TreeForm[]) => {
  return forms
    .map(({ value }) => value)
    .join(',')
    .concat(':|-:')
}
