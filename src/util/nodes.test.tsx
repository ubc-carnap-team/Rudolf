import { decomposeNode, makeNode, parseBranch } from './nodes'

const conclusionNode = makeNode('Q')
const conditionalNode = makeNode('P->Q', [conclusionNode])
const ponensTree = makeNode('P', [conditionalNode])

describe(parseBranch, () => {
  it('should parse "P,Q" as two stacked nodes', () => {
    expect(parseBranch('P,Q')).toMatchObject({
      formula: 'P',
      resolved: false,
      children: [{ formula: 'Q', resolved: false, children: [] }],
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
        {
          name: 'Q/\\~P',
          resolved: false,
          children: [],
          closed: false,
        },
        // @ts-ignore
        []
      )
    ).toMatchObject(ponensTree)
  })
})
