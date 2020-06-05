import { FormulaNode, TreeForm, TreeNode } from '../typings/TreeState'

type SequentNode = {
  label: string
  rule: string
  forest: SequentNode[]
}

export const convertToSequent = (node: TreeNode): SequentNode => {
  switch (node.nodeType) {
    case 'formulas':
      return convertToSequentFN(node, [])
    case 'finished':
    case 'contradiction':
      throw new Error('TODO')
    default:
      throw 'invalid node'
  }
}

const convertToSequentFN = (
  { formulas: newFormulas, forest }: FormulaNode,
  previousFormulas: TreeForm[]
): SequentNode => {
  const formulas = previousFormulas.concat(newFormulas)
  if (forest.length === 0) {
    return { label: formulasToSequent(formulas), rule: '', forest: [] }
  } else {
    const [{ nodeType, rule, parentRow }] = forest
    if (nodeType === 'formulas') {
      return {
        // TODO Handle case where row string isn't a number
        label: rearrangeFormulas(formulas, Number(parentRow)),
        rule,
        forest: forest.map((node) =>
          convertToSequentFN(
            node as FormulaNode,
            formulas.filter((form) => !(form.row === Number(parentRow)))
          )
        ),
      }
    } else if (nodeType === 'contradiction') {
      // Expect parentRow to be "<number>,<number>"
      // TODO Handle case where it isn't
      const [row1, row2] = parentRow.split(',').map(Number)
      const [form1, form2] = formulas
        .filter((form) => [row1, row2].includes(form.row))
        // this sort is a hack to avoid parsing for negation symbol, which may vary
        .sort((a, b) => b.value.length - a.value.length)
      if (!(form1 || form2)) {
        console.error(form1, form2)
      }
      const contradictionSequent = formulasToSequent([
        form1,
        ...formulas.filter((form) => ![row1, row2].includes(form.row)),
        form2,
      ])
      return {
        label: contradictionSequent,
        rule: 'Ax',
        forest: [{ label: '', rule: '', forest: [] }],
      }
    } else if (nodeType === 'finished') {
      return {
        label: formulasToSequent(formulas),
        rule: '',
        forest: [],
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

const TODO = () => new Error('TODO')
