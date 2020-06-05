/* eslint-disable react/jsx-no-undef */
import React, { FC, Fragment, ChangeEventHandler } from 'react'
import LineTo from 'react-lineto'
import AutoSizeInput from 'react-input-autosize'
import { TreeNode } from '../typings/TreeState'
import FormulaView from './FormulaView'
import { CustomDispatch, updateRule, updateParentRow } from '../RudolfReducer'
import { lastRow, firstRow } from '../util/nodes'
import Spacers from './Spacers'

type Props = {
  node: TreeNode
  dispatch: CustomDispatch
}

const NodeView: FC<Props> = ({ node, dispatch }) => {
  const handleParentRowChange: ChangeEventHandler<HTMLInputElement> = ({
    currentTarget: { value },
  }) => {
    dispatch(updateParentRow(node.id, value))
  }
  if (node.nodeType === 'formulas') {
    const { rule, parentRow, id, formulas, forest } = node
    const handleRuleChange: ChangeEventHandler<HTMLInputElement> = ({
      currentTarget: { value },
    }) => {
      dispatch(updateRule(id, value))
    }
    const spacers =
      forest[0]?.nodeType === 'formulas' ? (
        <Spacers diff={firstRow(forest[0]) - lastRow(node)} />
      ) : undefined

    return (
      <div className={`node-container `}>
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
              />
            )
          })}
          {node.id !== '' ? (
            <>
              <AutoSizeInput
                className="rule"
                onChange={handleRuleChange}
                value={rule}
                placeholder="rule"
              />
              <AutoSizeInput
                className="rule"
                onChange={handleParentRowChange}
                value={parentRow}
                placeholder="row"
              />
            </>
          ) : (
            'AS'
          )}
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
                  }}
                />
              </Fragment>
            )
          })}
        </div>
      </div>
    )
  } else if (node.nodeType === 'contradiction') {
    return (
      <div className="closed-branch-marker">
        X|
        <AutoSizeInput
          className="rule"
          onChange={handleParentRowChange}
          value={node.parentRow}
          placeholder="row"
        />
      </div>
    )
  } else if (node.nodeType === 'finished') {
    return <div className="finished-branch-marker">O| </div>
  } else {
    throw new Error(
      `Invariant violation: Invalid nodeType on node: ${JSON.stringify(node)}`
    )
  }
}

export default NodeView
