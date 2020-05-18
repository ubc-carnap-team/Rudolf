import { convertToSequent } from './carnapAdapter'
import { TreeNode, FormulaNode } from '../typings/TreeState'
// import modusPonens from '../examples/correctExample.json'

describe('convertToSequent', () => {
  it('converts a single node correctly', () => {
    const pAndQNode: FormulaNode = {
      nodeType: 'formulas',
      formulas: [{ row: 1, value: 'P/\\Q', resolved: true }],
      rule: 'AS',
      id: '0',
      forest: [
        {
          nodeType: 'formulas',
          formulas: [
            { row: 2, value: 'P', resolved: false },
            { row: 3, value: 'Q', resolved: false },
          ],
          rule: '',
          id: '00',
          forest: [],
        },
      ],
    }
    const expected = {
      label: 'P/\\Q:|-:',
      rule: '',
      forest: [
        {
          label: 'P,Q:|-:',
          rule: '',
          forest: [],
        },
      ],
    }
    expect(convertToSequent(pAndQNode)).toMatchObject(expected)
  })
})
