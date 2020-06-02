/* eslint-disable react/jsx-no-undef */
import React, { ChangeEventHandler, FC, Fragment } from 'react'
import AutoSizeInput from 'react-input-autosize'
import LineTo from 'react-lineto'

import { CustomDispatch, updateRule } from '../RudolfReducer'
import { TreeNode } from '../typings/TreeState'
import { firstRow, lastRow } from '../util/nodes'
import FormulaView from './FormulaView'
import Spacers from './Spacers'

type Props = {
  node: TreeNode
  dispatch: CustomDispatch
  canHighlight: boolean
  highlightCount: number
  toggleHighlight: () => void
  incrementHighlight: () => void
  resetHighlight: () => void
}

const NodeView: FC<Props> = ({
  node,
  dispatch,
  canHighlight,
  toggleHighlight,
  highlightCount,
  incrementHighlight,
  resetHighlight,
}) => {
  if (node.nodeType === 'formulas') {
    const { rule, id, formulas, forest } = node
    const handleRuleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
      dispatch(updateRule(id, event.currentTarget.value))
    }
    const spacers =
      forest[0]?.nodeType === 'formulas' ? (
        <Spacers diff={firstRow(forest[0]) - lastRow(node)} />
      ) : undefined

    return (
      <div className="node-container">
        <div
          className={`node-id=${id}`}
          // TODO: allow context menu on nodes?
          // onContextMenu={handleContextMenu}
        >
          {formulas.map((form, index) => {
            return (
              <FormulaView
                key={`${form}-${index}`}
                node={node}
                index={index}
                dispatch={dispatch}
                {...form}
                canHighlight={canHighlight}
                toggleHighlight={toggleHighlight}
                highlightCount={highlightCount}
                incrementHighlight={incrementHighlight}
                resetHighlight={resetHighlight}
              />
            )
          })}
          (
          <AutoSizeInput
            className="rule"
            onChange={handleRuleChange}
            value={rule}
            placeholder="rule"
          />
          )
        </div>

        <div className={`children ${forest.length > 1 ? 'split' : 'stack'}`}>
          {forest.map((child) => {
            return (
              <Fragment key={child.id}>
                {spacers}
                <LineTo
                  from={`node-id=${id}`}
                  to={`node-id=${child.id}`}
                  borderColor="black"
                  fromAnchor="bottom"
                  toAnchor="top"
                  delay={0}
                />
                <NodeView
                  {...{
                    node: child,
                    dispatch,
                    canHighlight,
                    toggleHighlight,
                    highlightCount,
                    incrementHighlight,
                    resetHighlight,
                  }}
                />
              </Fragment>
            )
          })}
        </div>
      </div>
    )
  } else if (node.nodeType === 'contradiction') {
    return <div className="closed-branch-marker">X</div>
  } else if (node.nodeType === 'finished') {
    return <div className="finished-branch-marker">O</div>
  } else {
    throw new Error(
      `Invariant violation: Invalid nodeType on node: ${JSON.stringify(node)}`
    )
  }
}

export default NodeView
