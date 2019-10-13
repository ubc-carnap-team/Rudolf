import './NodeView.css'

import Check from '@material-ui/icons/Check'
import React, {
  FC,
  Fragment,
  FormEventHandler,
  MouseEventHandler,
  useState,
  useRef,
  Ref,
} from 'react'
import LineTo from 'react-lineto'

import { TreeNode, NodeUpdater } from '../typings/TreeNode'
import { NodeMenu } from './NodeMenu'

type Props = {
  node: TreeNode
  selectedNode: TreeNode | null
  selectNode: (_: TreeNode) => void
  getNextNodeId: () => string
  nodeId: string
  onChange: (_: { node: TreeNode; label: string; rule: string }) => void
  updateTree: (node: TreeNode, updater: NodeUpdater) => void
}
const NodeView: FC<Props> = ({
  node,
  selectedNode,
  selectNode,
  getNextNodeId,
  nodeId,
  onChange,
  updateTree,
}) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const nodeRef: Ref<HTMLDivElement> = useRef(null)

  const handleLabelChange: FormEventHandler<HTMLInputElement> = (event) => {
    onChange({
      node,
      label: event.currentTarget.value,
      rule: node.rule,
    })
  }

  const handleContextMenu: MouseEventHandler = (event) => {
    event.preventDefault()
    setMenuOpen(true)
  }

  const handleRuleChange: FormEventHandler<HTMLInputElement> = (event) => {
    onChange({
      node,
      label: node.label,
      rule: event.currentTarget.value,
    })
  }

  return (
    <div
      className={`node-container ${selectedNode === node ? 'selected' : ''}`}
    >
      <div
        className={`node ${nodeId} ${selectedNode === node ? 'selected' : ''} `}
        onContextMenu={handleContextMenu}
        ref={nodeRef}
      >
        <input
          className="label"
          onChange={handleLabelChange}
          value={node.label}
          placeholder="formula"
        ></input>
        (
        <input
          className="rule"
          onChange={handleRuleChange}
          value={node.rule}
          placeholder="rule"
        />
        ){node.resolved ? <Check /> : ''}
        {node.closed && <div className="closed-branch-marker">X</div>}
      </div>
      {node.forest.length > 0 &&
        (node.forest.length === 1 ? (
          <div className="children stack">
            <NodeView
              {...{
                node: node.forest[0],
                selectedNode,
                selectNode,
                getNextNodeId,
                nodeId: getNextNodeId(),
                onChange,
                updateTree,
              }}
            />
          </div>
        ) : (
          <div className="children split">
            {node.forest.map((child) => {
              const childNodeId = getNextNodeId()
              return (
                <Fragment key={childNodeId}>
                  <LineTo
                    from={nodeId}
                    to={childNodeId}
                    borderColor="black"
                    fromAnchor="bottom"
                    toAnchor="top"
                    delay={0}
                  />
                  <NodeView
                    {...{
                      node: child,
                      selectedNode,
                      selectNode,
                      getNextNodeId,
                      nodeId: childNodeId,
                      onChange,
                      updateTree,
                    }}
                  />
                </Fragment>
              )
            })}
          </div>
        ))}
      <NodeMenu
        open={menuOpen}
        node={node}
        onClose={() => setMenuOpen(false)}
        updateTree={updateTree}
        anchorEl={nodeRef.current as Element}
      />
    </div>
  )
}

export default NodeView
