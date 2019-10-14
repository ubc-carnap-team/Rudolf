import React, { useState } from 'react'

import { TreeNode, NodeUpdater } from '../typings/TreeNode'
import { updateNode, parsePremises } from '../util/nodes'
import NodeView from './NodeView'
import PremiseInput from './PremiseInput'
import PremisesSelector from './PremisesSelector'

const defaultPremises = 'P->Q,P,~Q'
const exampleTree: TreeNode = parsePremises(defaultPremises.split(','))

const App: React.FC = (): JSX.Element => {
  const [selectedNode, selectNode] = useState<TreeNode | null>(null)
  const [tree, setTree] = useState<TreeNode>(exampleTree)
  const [premises, setPremises] = useState<string>(defaultPremises)

  const getNextNodeId = (() => {
    let count = 0
    return () => `${count++}`
  })()

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

  const handleSubmitPremises = (premises: string) => {
    setPremises(premises)
    setTree(parsePremises(premises.split(',')))
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
          selectedNode={selectedNode}
          getNextNodeId={getNextNodeId}
          nodeId={getNextNodeId()}
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
