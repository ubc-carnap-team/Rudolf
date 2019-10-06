import { parseBranch, makeNode, decomposeNode } from './nodes'
import { TreeNode } from '../typings/TreeNode'

const conclusionNode = makeNode('Q')
const conditionalNode = makeNode('P->Q', [conclusionNode])
const ponensTree = makeNode('P', [conditionalNode])

describe(parseBranch, () => {
  it('should parse "P,Q" as two stacked nodes', () => {
    expect(parseBranch('P,Q')).toMatchObject<TreeNode>({
      label: 'P',
      rule: '',
      resolved: false,
      closed: false,
      forest: [
        { label: 'Q', resolved: false, forest: [], rule: '', closed: false },
      ],
    })
  })
  it('should return null when given ","', () =>
    expect(parseBranch(',')).toBeNull())
})

describe(decomposeNode, () => {
  it('should append no new nodes when the newNodes array is empty', () => {
    expect(
      decomposeNode(
        ponensTree,
        ponensTree,
        // @ts-ignore
        []
      )
    ).toMatchObject(ponensTree)
  })
})
