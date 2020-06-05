import { FormulaNode, TreeForm, TreeNode } from '../typings/TreeState'

type SequentNode = {
  label: string
  rule: string
  forest: SequentNode[]
}

export const convertToSequent = (node: TreeNode): SequentNode => {
  switch (node.nodeType) {
    case 'formulas':
      return convertToSequentFN(node)
    case 'finished':
    case 'contradiction':
      throw new Error('TODO')
    default:
      throw 'invalid node'
  }
}

const convertToSequentFN = ({ formulas, forest }: FormulaNode): SequentNode => {
  if (forest.length === 0) {
    return { label: formulas.join(',').concat(':|-:'), rule: '', forest: [] }
  } else {
    const [{ nodeType, rule, parentRow }] = forest
    if (nodeType === 'formulas') {
      return {
        // TODO Handle case where row string isn't a number
        label: formulasToSequent(formulas, Number(parentRow)),
        rule,
        forest: forest.map(convertToSequent),
      }
    } else if (nodeType === 'contradiction') {
      // Expect parentRow to be "<number>,<number>"
      // TODO Handle case where it isn't
      const [row1, row2] = parentRow.split(',').map(Number)
      const [form1, form2] = formulas
        .filter((form) => [row1, row2].includes(form.row))
        .sort((a, b) => a.value.length - b.value.length)

      const contradictionSequent = [
        form1,
        ...formulas.filter((form) => ![row1, row2].includes(form.row)),
        form2,
      ]
        .map(({ value }) => value)
        .join(',')
        .concat(':|-:')
      return {
        label: contradictionSequent,
        rule: 'Ax',
        forest: forest.map(convertToSequent),
      }
    } else if (nodeType === 'finished') {
      throw 'TODO'
    } else {
      throw 'this was supposed to be exhaustive'
    }
  }
}
const formulasToSequent = (
  forms: TreeForm[],
  mainFormulaRow: number
): string => {
  const idx = forms.findIndex((form) => form.row === mainFormulaRow)
  const mainFormula = forms[idx]
  const formulasWithoutMain = forms.splice(idx)
  const newList = [...formulasWithoutMain, mainFormula]
  return newList
    .map(({ value }) => value)
    .join(',')
    .concat(':|-:')
}
