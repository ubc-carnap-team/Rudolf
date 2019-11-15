import React, { useState } from 'react'

import { NodeUpdater, TreeNode } from '../typings/TreeNode'
import { parsePremises, updateNode } from '../util/nodes'
import NodeView from './NodeView'
import PremiseInput from './PremiseInput'
import PremisesSelector from './PremisesSelector'

const initialPremises = 'P->Q,P,~Q'

const App: React.FC = (): JSX.Element => {
  const [selectedNode, selectNode] = useState<TreeNode | null>(null)
  const [tree, setTree] = useState<TreeNode>(
    parsePremises(initialPremises.split(','))
  )
  const [premises, setPremises] = useState<string>(initialPremises)
  const [nextRow, setRow] = useState<number>(premises.split(',').length)

  const incrementRow = () => {
    setRow(nextRow + 1)
  }

  const handleNodeChange = ({
    node,
    label,
    rule,
  }: {
    node: TreeNode
    label: string
    rule: string
  }) => {
    setTree((oldTree) =>
      updateNode(oldTree, node, (oldSubTree) => ({
        ...oldSubTree,
        label,
        rule,
      }))
    )
  }

  const handleSubmitPremises = (rawInput: string) => {
    setPremises(rawInput)
    const premiseArray = premises.split(',')
    setTree(parsePremises(premiseArray))
    setRow(premiseArray.length)
  }

  return (
    <div className="App">
      <main className="App-main">
        <PremisesSelector onChange={handleSubmitPremises} />
        <PremiseInput
          premises={premises}
          onSubmit={handleSubmitPremises}
          setPremises={setPremises}
        />
        <NodeView
          node={tree}
          selectNode={selectNode}
          nextRow={nextRow}
          incrementRow={incrementRow}
          selectedNode={selectedNode}
          onChange={handleNodeChange}
          updateTree={(node: TreeNode, updater: NodeUpdater) =>
            setTree(updateNode(tree, node, updater))
          }
        />
      </main>
    </div>
  )
}

export default App
