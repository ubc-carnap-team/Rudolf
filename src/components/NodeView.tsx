import './NodeView.css'

import Check from '@material-ui/icons/Check'
import React, { FC, Fragment, FormEvent, FormEventHandler } from 'react'
import LineTo from 'react-lineto'

import { TreeNode } from '../typings/TreeNode'

type Props = {
  root: TreeNode
  selectedNode: TreeNode | null
  selectNode: (_: TreeNode) => void
  getNextNodeId: () => string
  nodeId: string
  onChange: (_: { node: TreeNode; label: string; rule: string }) => void
}
const NodeView: FC<Props> = ({
  root,
  selectedNode,
  selectNode,
  getNextNodeId,
  nodeId,
  onChange,
}) => {
  const handleLabelChange: FormEventHandler<HTMLInputElement> = (event) => {
    onChange({
      node: root,
      label: event.currentTarget.value,
      rule: root.rule,
    })
  }

  const handleRuleChange: FormEventHandler<HTMLInputElement> = (event) => {
    onChange({
      node: root,
      label: root.label,
      rule: event.currentTarget.value,
    })
  }
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
        <input
          className="label"
          onChange={handleLabelChange}
          value={root.label}
          placeholder="formula"
        ></input>
        (
        <input
          className="rule"
          onChange={handleRuleChange}
          value={root.rule}
          placeholder="rule"
        />
        ){root.resolved ? <Check /> : ''}
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
                onChange,
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
                      onChange,
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
