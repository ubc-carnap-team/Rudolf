/* eslint-disable react/jsx-no-undef */
import { Tooltip } from '@material-ui/core'
import React, { FC } from 'react'
import AutosizeInput from 'react-input-autosize'
import { ArcherElement } from 'react-archer'

import { CustomDispatch, updateContradiction } from '../RudolfReducer'
import { FeedbackMap } from '../typings/Checker'
import { JustificationMap, TreeNode } from '../typings/TreeState'
import { firstRow, isFormulaNode } from '../util/nodes'
import FormulaView from './FormulaView'
import nodeviewJSS, { rowHeight } from '../styles/NodeView_styles'

type Props = {
  node: TreeNode
  dispatch: CustomDispatch
  justifications: JustificationMap
  feedbackMap?: FeedbackMap
  currLastRow: number
}

const NodeView: FC<Props> = ({
  node,
  dispatch,
  justifications,
  feedbackMap,
  currLastRow,
  ...props
}) => {
  const classes = nodeviewJSS()
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

    return (
      <div
        className={classes.NodeView}
        style={{
          gridTemplateRows: `repeat(${
            currLastRow - firstRow(node) + 1
          }, ${rowHeight})`,
          gridTemplateColumns: `repeat(${forest.length}, auto)`,
        }}
      >
        <div
          style={{
            gridRow: '1',
            gridColumn: `1 / span ${forest.length}`,
          }}
        >
          <Tooltip
            title={feedbackInfo}
            PopperProps={{ style: { fontSize: 16 } }}
          >
            <ArcherElement
              id={id}
              relations={forest.map((child) => {
                return {
                  targetId: child.id,
                  targetAnchor: 'top',
                  sourceAnchor: 'bottom',
                }
              })}
            >
              <div
                // TODO: allow context menu on nodes?
                // onContextMenu={handleContextMenu}
                style={{
                  borderStyle: feedbackMap ? 'solid' : 'none',
                  borderColor: feedbackClass === 'correct' ? 'green' : 'red',
                  borderWidth: '1.5px',
                }}
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
              </div>
            </ArcherElement>
          </Tooltip>
        </div>

        {forest.map((child, index) => {
          return (
            <div
              key={child.id}
              style={{
                gridColumn: `${index} / span 1`,
                gridRow: child.formulas[0]
                  ? `${child.formulas[0].row - firstRow(node) + 1}`
                  : 2,
              }}
            >
              <NodeView
                {...{
                  node: child,
                  dispatch,
                  justifications,
                  currLastRow,
                  feedbackMap,
                }}
              />
            </div>
          )
        })}
      </div>
    )
  } else if (node.nodeType === 'contradiction') {
    return (
      <Tooltip title={feedbackInfo} PopperProps={{ style: { fontSize: 16 } }}>
        <ArcherElement id={node.id}>
          <div
            className={`closed-branch-marker node ${feedbackClass}`}
            {...props}
          >
            X
            <AutosizeInput
              className="rule"
              onChange={({ currentTarget: { value } }) =>
                dispatch(updateContradiction(node.id, value))
              }
              value={node.contradictoryRows}
              placeholder="rows"
            />
          </div>
        </ArcherElement>
      </Tooltip>
    )
  } else if (node.nodeType === 'finished') {
    return (
      <Tooltip title={feedbackInfo} PopperProps={{ style: { fontSize: 16 } }}>
        <ArcherElement id={node.id}>
          <div className={`finished-branch-marker ${feedbackClass}`} {...props}>
            O{' '}
          </div>
        </ArcherElement>
      </Tooltip>
    )
  } else {
    throw new Error(
      `Invariant violation: Invalid nodeType on node: ${JSON.stringify(node)}`
    )
  }
}

export default NodeView
