import React from 'react'
import NodeView from './NodeView'
import {
  RudolfStore,
  CustomDispatch,
  updateJustification,
} from '../RudolfReducer'
import nodeviewJSS, { rowHeight } from '../styles/NodeView_styles'
import { range } from '../util/helpers'
import AutosizeInput from 'react-input-autosize'
import { firstRow } from '../util/nodes'

type Props = {
  currentState: RudolfStore
  dispatch: CustomDispatch
}

const NodeViewBase = ({ currentState, dispatch }: Props) => {
  const classes = nodeviewJSS()
  const { nextRow, tree, justifications, feedback } = currentState
  const rows = range(firstRow(currentState.tree), nextRow)
  return (
    <div
      className={classes.NodeViewBaseContainer}
      style={{
        gridTemplateRows: `repeat(${nextRow - 1}, ${rowHeight})`,
      }}
    >
      {rows.map((row) => {
        return (
          <div className={classes.RowNumber} key={row} style={{ gridRow: row }}>
            {row}
          </div>
        )
      })}
      <div
        style={{
          gridArea: 'nodeview',
        }}
      >
        <NodeView
          node={tree}
          dispatch={dispatch}
          justifications={justifications}
          feedbackMap={feedback.feedback}
        />
      </div>
      {rows.map((row) => {
        const { rule, parentRow } = justifications[row]
        return (
          <div className="justification" key={row} style={{ gridRow: row }}>
            <AutosizeInput
              className="rule"
              onChange={({ currentTarget: { value: rule } }) =>
                dispatch(updateJustification(row, { rule }))
              }
              value={rule}
              placeholder="rule"
            />
            <AutosizeInput
              className="row"
              onChange={({ currentTarget: { value: parentRow } }) =>
                dispatch(updateJustification(row, { parentRow }))
              }
              value={parentRow}
              placeholder="row"
            />
          </div>
        )
      })}
    </div>
  )
}

export default NodeViewBase
