/* eslint-disable react/jsx-no-undef */
import { Tooltip } from '@material-ui/core'
import React, { FC, Fragment } from 'react'
import AutoSizeInput from 'react-input-autosize'
import LineTo from 'react-lineto'

import {
  CustomDispatch,
  updateContradiction,
  updateJustification,
} from '../RudolfReducer'
import { FeedbackMap } from '../typings/Checker'
import { JustificationMap, TreeNode } from '../typings/TreeState'
import { firstRow, isFormulaNode, lastRow } from '../util/nodes'
import FormulaView from './FormulaView'
import Spacers from './Spacers'

type Props = {
  node: TreeNode
  dispatch: CustomDispatch
  justifications: JustificationMap
  feedbackMap?: FeedbackMap
  windowSize: string
}

const NodeView: FC<Props> = ({
  node,
  dispatch,
  justifications,
  feedbackMap,
  windowSize,
  ...props
}) => {
  let feedbackInfo, feedbackClass
  if (feedbackMap) {
    const feedback = feedbackMap[node.id] ?? ''
    feedbackInfo = feedback.info
    feedbackClass = feedback.class === 'correct' ? 'correct' : 'incorrect'
  } else {
    feedbackInfo = ''
    feedbackClass = ''
  }
  if (isFormulaNode(node)) {
    const { id, formulas, forest } = node

    const spacers =
      forest[0]?.nodeType === 'formulas' ? (
        <Spacers diff={firstRow(forest[0]) - lastRow(node)} />
      ) : undefined

    const { rule, parentRow } = justifications[firstRow(node)]

    return (
      <div className={`node-container `}>
        <Tooltip title={feedbackInfo} PopperProps={{ style: { fontSize: 16 } }}>
          <div
            className={`node node-id=${id} ${feedbackClass}`}
            // TODO: allow context menu on nodes?
            // onContextMenu={handleContextMenu}
            {...props}
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
              <div className="justification">
                <AutoSizeInput
                  className="rule"
                  onChange={({ currentTarget: { value: rule } }) =>
                    dispatch(updateJustification(firstRow(node), { rule }))
                  }
                  value={rule}
                  placeholder="rule"
                />
                <AutoSizeInput
                  className="row"
                  onChange={({ currentTarget: { value: parentRow } }) =>
                    dispatch(updateJustification(firstRow(node), { parentRow }))
                  }
                  value={parentRow}
                  placeholder="row"
                />
              </div>
            ) : (
              'AS'
            )}
          </div>
        </Tooltip>

        <div className={`children ${forest.length > 1 ? 'split' : 'stack'}`}>
          {forest.map((child) => {
            return (
              <Fragment key={child.id}>
                {spacers}
                <LineTo
                  key={windowSize}
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
                    justifications,
                    feedbackMap,
                    windowSize,
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
      <Tooltip title={feedbackInfo} PopperProps={{ style: { fontSize: 16 } }}>
        <div
          className={`closed-branch-marker node ${feedbackClass}`}
          {...props}
        >
          X
          <AutoSizeInput
            className="rule"
            onChange={({ currentTarget: { value } }) =>
              dispatch(updateContradiction(node.id, value))
            }
            value={node.contradictoryRows}
            placeholder="rows"
          />
        </div>
      </Tooltip>
    )
  } else if (node.nodeType === 'finished') {
    return (
      <Tooltip title={feedbackInfo} PopperProps={{ style: { fontSize: 16 } }}>
        <div className={`finished-branch-marker ${feedbackClass}`} {...props}>
          O{' '}
        </div>
      </Tooltip>
    )
  } else {
    throw new Error(
      `Invariant violation: Invalid nodeType on node: ${JSON.stringify(node)}`
    )
  }
}

export default NodeView
