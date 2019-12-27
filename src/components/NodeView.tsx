/* eslint-disable react/jsx-no-undef */
import React, {
  FC,
  Fragment,
  MouseEventHandler,
  Ref,
  useRef,
  useState,
} from 'react'
import LineTo from 'react-lineto'
import AutoSizeInput from 'react-input-autosize'
import { TreeNode } from '../typings/TreeState'
import { NodeMenu } from './NodeMenu'
import FormulaView from './FormulaView'
import { CustomDispatch } from '../RudolfReducer'

type Props = {
  node: TreeNode
  selectedNodeId: string | null
  nextRow: number
  dispatch: CustomDispatch
}

const NodeView: FC<Props> = ({ node, selectedNodeId, nextRow, dispatch }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const nodeRef: Ref<HTMLDivElement> = useRef(null)

  // TODO: move to formula
  // const handleLabelChange: ChangeEventHandler<HTMLInputElement> = (event) => {
  //   onChange({
  //     node,
  //     label: event.currentTarget.value,
  //     rule: node.rule,
  //   })
  // }

  // TODO move to formmula
  const handleContextMenu: MouseEventHandler = (event) => {
    event.preventDefault()
    setMenuOpen(true)
  }

  // TODO nove to formula
  // const handleRuleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
  //   onChange({
  //     node,
  //     label: node.label,
  //     rule: event.currentTarget.value,
  //   })
  // }

  return (
    <div
      className={`node-container ${
        selectedNodeId === node.id ? 'selected' : ''
      }`}
    >
      <div
        className={`node-id=${node.id} ${
          selectedNodeId === node.id ? 'selected' : ''
        } `}
        onContextMenu={handleContextMenu}
        ref={nodeRef}
      >
        {node.formulas.map((form, i) => (
          // TODO: don't use index as key
          <FormulaView key={i} {...form} />
        ))}
        (
        <AutoSizeInput
          className="rule"
          // onChange={handleRuleChange}
          value={node.rule}
          placeholder="rule"
        />
        )
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
            {/* <Spacers diff={node.forest[0].row - node.row} /> */}
            <NodeView
              {...{
                node: node.forest[0],
                selectedNodeId,

                nextRow,
                dispatch,
              }}
            />
          </div>
        ) : (
          <div className="children split">
            {node.forest.map((child) => {
              return (
                <Fragment key={child.id}>
                  {/* <Spacers diff={child.row - node.row} /> */}
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
                      selectedNodeId,
                      nextRow,
                      dispatch,
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
        dispatch={dispatch}
        anchorEl={nodeRef.current as Element}
        nextRow={nextRow}
      />
    </div>
  )
}

export default NodeView
