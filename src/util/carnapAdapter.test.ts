import { convertToSequent } from './carnapAdapter'
import { FormulaNode } from '../typings/TreeState'
import { SequentNode } from '../typings/Checker'

// TODO
// We should be doing property-based testing.
// i.e. checking the proof succeeds/fails
// instead of constraining the intermediate representation

describe('convertToSequent', () => {
  it('converts open branched tree for single conjunction correctly', () => {
    const pAndQNode: FormulaNode = {
      nodeType: 'formulas',
      formulas: [{ row: 1, value: 'P/\\Q', resolved: true }],
      id: '',
      forest: [
        {
          nodeType: 'formulas',
          formulas: [
            { row: 2, value: 'P', resolved: false },
            { row: 3, value: 'Q', resolved: false },
          ],
          id: '0',
          forest: [{ nodeType: 'finished', id: '00', formulas: [] }],
        },
      ],
    }
    const expected: SequentNode = {
      label: 'P/\\Q:|-:',
      rule: 'St',
      forest: [
        {
          label: 'P/\\Q:|-:',
          rule: '&',
          id: '',
          forest: [
            {
              label: 'P,Q:|-:',
              rule: 'St',
              id: '0',
              forest: [
                {
                  label: 'P,Q:|-:',
                  id: '00',
                  rule: 'Lit',
                  forest: [{ label: '', rule: '', forest: [] }],
                },
              ],
            },
          ],
        },
      ],
    }
    expect(
      convertToSequent(pAndQNode, { 2: { rule: '&', parentRow: '1' } })
    ).toEqual(expected)
  })

  xit('converts small complete example with conjunction correctly.', () => {
    // TODO
  })
  xit('converts complete modus ponens tree correctly.', () => {
    // TODO
  })
})
