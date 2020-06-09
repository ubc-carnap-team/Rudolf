/* eslint-disable react/jsx-no-undef */
import React, { FC, Fragment } from 'react'
import LineTo from 'react-lineto'
import AutoSizeInput from 'react-input-autosize'
import { TreeNode } from '../typings/TreeState'
import FormulaView from './FormulaView'
import {
  CustomDispatch,
  updateContradiction,
  updateJustification,
  RudolfStore,
} from '../RudolfReducer'
import { lastRow, firstRow } from '../util/nodes'
import Spacers from './Spacers'
import { isFormulaNode } from '../util/util'

type Props = {
  node: TreeNode
  dispatch: CustomDispatch
  store: RudolfStore
}

const NodeView: FC<Props> = ({ node, dispatch, store }) => {
  if (isFormulaNode(node)) {
    const { id, formulas, forest } = node

    const spacers =
      forest[0]?.nodeType === 'formulas' ? (
        <Spacers diff={firstRow(forest[0]) - lastRow(node)} />
      ) : undefined

    const { rule, parentRow } = store.justifications[firstRow(node)]
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
                row={form.row}
                {...form}
              />
            )
          })}
          <AutoSizeInput
            className="rule"
            onChange={({ currentTarget: { value: rule } }) =>
              dispatch(updateJustification(firstRow(node), { rule }))
            }
            value={rule}
            placeholder="rule"
          />
          <AutoSizeInput
            className="rule"
            onChange={({ currentTarget: { value: parentRow } }) =>
              dispatch(updateJustification(firstRow(node), { parentRow }))
            }
            value={parentRow}
            placeholder="row"
          />
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
                    store,
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
          onChange={({ currentTarget: { value } }) =>
            updateContradiction(node.id, value)
          }
          value={node.contradictoryRows}
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
