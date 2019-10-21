import Check from '@material-ui/icons/Check'
import React, {
  FC,
  Fragment,
  MouseEventHandler,
  useState,
  useRef,
  Ref,
  ChangeEventHandler,
} from 'react'
import LineTo from 'react-lineto'
import AutoSizeInput from 'react-input-autosize'

import { TreeNode, NodeUpdater } from '../typings/TreeNode'
import { NodeMenu } from './NodeMenu'

type Props = {
  node: TreeNode
  selectedNode: TreeNode | null
  selectNode: (_: TreeNode) => void
  onChange: (_: { node: TreeNode; label: string; rule: string }) => void
  updateTree: (node: TreeNode, updater: NodeUpdater) => void
}
const NodeView: FC<Props> = ({
  node,
  selectedNode,
  selectNode,

  onChange,
  updateTree,
}) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const nodeRef: Ref<HTMLDivElement> = useRef(null)

  const handleLabelChange: ChangeEventHandler<HTMLInputElement> = (event) => {
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

  const handleRuleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
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
        className={`node node-id=${node.id} ${
          selectedNode === node ? 'selected' : ''
        } `}
        onContextMenu={handleContextMenu}
        ref={nodeRef}
      >
        <AutoSizeInput
          className="label"
          onChange={handleLabelChange}
          value={node.label}
          placeholder="formula"
        />
        (
        <AutoSizeInput
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
                onChange,
                updateTree,
              }}
            />
          </div>
        ) : (
          <div className="children split">
            {node.forest.map((child) => {
              return (
                <Fragment key={child.id}>
                  <LineTo
                    from={`node-id=${node.id}`}
                    to={`node-id=${child.id}`}
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
