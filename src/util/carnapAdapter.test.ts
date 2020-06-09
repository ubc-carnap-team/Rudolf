// @ts-nocheck
/* eslint-disable @typescript-eslint/camelcase */
import { convertToSequent } from './carnapAdapter'
import { FormulaNode } from '../typings/TreeState'
import modusPonens from '../examples/modusPonens.json'
import notQ_PAndQ from '../examples/conjunctionContradiction.json'

describe('convertToSequent', () => {
  it('converts open tree for single conjunction correctly', () => {
    const pAndQNode: FormulaNode = {
      nodeType: 'formulas',
      formulas: [{ row: 1, value: 'P/\\Q', resolved: true }],
      rule: 'AS',
      parentRow: '',
      id: '0',
      forest: [
        {
          nodeType: 'formulas',
          formulas: [
            { row: 2, value: 'P', resolved: false },
            { row: 3, value: 'Q', resolved: false },
          ],
          rule: '\\/',
          parentRow: '1',
          id: '00',
          forest: [],
        },
      ],
    }
    const expected = {
      label: 'P/\\Q:|-:',
      rule: '\\/',
      forest: [
        {
          label: 'P,Q:|-:',
          rule: '',
          forest: [],
        },
      ],
    }
    expect(convertToSequent(pAndQNode)).toEqual(expected)
  })

  it('converts small complete example with conjunction correctly.', () => {
    const expected = 'TODO'
    expect(convertToSequent(notQ_PAndQ as any)).toEqual(expected)
  })
  it('converts complete modus ponens tree correctly.', () => {
    const expected = 'TODO'
    expect(convertToSequent(modusPonens as any)).toEqual(expected)
  })
})
