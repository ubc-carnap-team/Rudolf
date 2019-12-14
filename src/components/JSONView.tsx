import { TextareaAutosize } from '@material-ui/core'
import React, { FC } from 'react'

import { FormulaNode } from '../typings/CarnapAPI'
import { TreeNode } from '../typings/TreeState'

export const JSONView: FC<{ tree: TreeNode }> = ({ tree }) => (
  <TextareaAutosize
    className="json-view"
    value={JSON.stringify(transformTree(tree), null, '\t')}
  />
)

const transformNode = ({
  forest: _,
  ...tree
}: TreeNode): Omit<FormulaNode, 'forest'> => {
  return { ...tree, formulas: [], nodeType: 'formulas' }
}

const transformTree = <T extends TreeNode>(tree: TreeNode): FormulaNode => {
  if (tree.forest === 'contradiction')
    return {
      ...transformNode(tree),
      forest: [
        { rule: 'contradiction', nodeType: 'contradiction', formulas: [] },
      ],
    }
  else if (tree.forest === 'finished') {
    return {
      ...transformNode(tree),
      forest: [
        {
          rule: 'finished',
          nodeType: 'finished' as const,
          formulas: [],
        },
      ],
    }
  } else
    return {
      ...transformNode(tree),
      forest: tree.forest.map(transformTree),
    }
}
