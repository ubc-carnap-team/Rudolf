import Check from '@material-ui/icons/Check'
import React, {
  ChangeEventHandler,
  FC,
  Fragment,
  MouseEventHandler,
  Ref,
  useRef,
  useState,
} from 'react'
import AutoSizeInput from 'react-input-autosize'
import LineTo from 'react-lineto'

import { NodeUpdater, TreeNode } from '../typings/TreeState'
import { NodeMenu } from './NodeMenu'

type Props = {
  node: TreeNode
  selectedNode: TreeNode | null
  selectNode: (_: TreeNode) => void
  onChange: (_: { node: TreeNode; label: string; rule: string }) => void
  updateTree: (node: TreeNode, updater: NodeUpdater) => void
  nextRow: number
  incrementRow: () => void
}

const Spacers = ({ diff }: { diff: number }) => {
  const spacers: JSX.Element[] = []
  const i = diff - 1
  while (spacers.length < i) {
    spacers.push(<div className="spacer" />)
  }

  return <>{spacers}</>
}

const NodeView: FC<Props> = ({
  node,
  selectedNode,
  selectNode,
  onChange,
  updateTree,
  nextRow,
  incrementRow,
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
        <span>{node.row} .</span>
        <input
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
        {node.forest === 'contradiction' && (
          <div className="closed-branch-marker">X</div>
        )}
        {node.forest === 'finished' && (
          <div className="finished-branch-marker">O</div>
        )}
      </div>

      {Array.isArray(node.forest) &&
        node.forest.length > 0 &&
        (node.forest.length === 1 ? (
          <div className="children stack">
            <Spacers diff={node.forest[0].row - node.row} />
            <NodeView
              {...{
                node: node.forest[0],
                selectedNode,
                selectNode,
                onChange,
                updateTree,
                nextRow,
                incrementRow,
              }}
            />
          </div>
        ) : (
          <div className="children split">
            {node.forest.map((child) => {
              return (
                <Fragment key={child.id}>
                  <Spacers diff={child.row - node.row} />
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
                      nextRow,
                      incrementRow,
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
        nextRow={nextRow}
        incrementRow={incrementRow}
      />
    </div>
  )
}

export default NodeView
