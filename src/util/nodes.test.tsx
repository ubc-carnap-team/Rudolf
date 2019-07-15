import { parseBranch, makeNode, decomposeNode } from './nodes'

const ponensTree = makeNode('P', [makeNode('Q/\\~P')])

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
          formula: 'Q/\\~P',
          resolved: false,
          children: [],
        },
        []
      )
    ).toMatchObject(ponensTree)
  })
})
