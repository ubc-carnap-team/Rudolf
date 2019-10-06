import './NodeView.css'

import Check from '@material-ui/icons/Check'
import React, { FC, Fragment } from 'react'
import LineTo from 'react-lineto'

import { TreeNode } from '../typings/TreeNode'

type Props = {
  root: TreeNode
  selectedNode: TreeNode | null
  selectNode: (_: TreeNode) => void
  getNextNodeId: () => string
  nodeId: string
}
const NodeView: FC<Props> = ({
  root,
  selectedNode,
  selectNode,
  getNextNodeId,
  nodeId,
}) => {
  return (
    <div
      className={`node-container ${selectedNode === root ? 'selected' : ''}`}
    >
      <div
        className={`node ${nodeId} ${selectedNode === root ? 'selected' : ''} `}
        onContextMenu={(event) => {
          event.preventDefault()
          selectNode(root)
        }}
      >
        <div className="label-input" contentEditable>
          {root.label}
        </div>
        <div className="rule-input" contentEditable>
          {root.rule}
        </div>
        {root.resolved ? <Check /> : ''}
        {root.closed && <div className="closed-branch-marker">X</div>}
      </div>
      {root.forest.length > 0 &&
        (root.forest.length === 1 ? (
          <div className="children stack">
            <NodeView
              {...{
                root: root.forest[0],
                selectedNode,
                selectNode,
                getNextNodeId,
                nodeId: getNextNodeId(),
              }}
            />
          </div>
        ) : (
          <div className="children split">
            {root.forest.map((child) => {
              const childNodeId = getNextNodeId()
              return (
                <Fragment key={childNodeId}>
                  <LineTo
                    from={nodeId}
                    to={childNodeId}
                    borderColor="white"
                    fromAnchor="bottom"
                    toAnchor="top"
                    delay={0}
                  />
                  <NodeView
                    {...{
                      root: child,
                      selectedNode,
                      selectNode,
                      getNextNodeId,
                      nodeId: childNodeId,
                    }}
                  />
                </Fragment>
              )
            })}
          </div>
        ))}
    </div>
  )
}

export default NodeView
