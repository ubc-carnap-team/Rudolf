import React from 'react'
import NodeView from './NodeView'
import {
  RudolfStore,
  CustomDispatch,
  updateJustification,
} from '../RudolfReducer'
import nodeviewJSS, { rowHeight } from '../styles/NodeView_styles'
import { range } from '../util/helpers'
import StyledAutosizeInput from './StyledAutosizeInput'

type Props = {
  currentState: RudolfStore
  dispatch: CustomDispatch
}

const TruthTree = ({ currentState, dispatch }: Props) => {
  const classes = nodeviewJSS()
  const { nextRow, tree, justifications, feedback } = currentState
  const rows = range(1, nextRow)
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
            {`${row}.`}
          </div>
        )
      })}
      <div
        style={{
          gridColumn: 'nodeView',
          gridRow: `1 / span ${rows.length}`,
        }}
      >
        <NodeView
          node={tree}
          dispatch={dispatch}
          justifications={justifications}
          feedbackMap={feedback.feedback}
          nextRow={nextRow}
        />
      </div>
      {Object.keys(justifications).map((rowString) => {
        const row = Number(rowString)
        const { parentRow, rule } = justifications[row]
        return (
          <div
            className={classes.Justification}
            key={row}
            style={{ gridRow: row }}
          >
            <StyledAutosizeInput
              onChange={({ currentTarget: { value: parentRow } }) =>
                dispatch(updateJustification(row, { parentRow }))
              }
              value={parentRow}
              placeholder="row"
            />
            <StyledAutosizeInput
              onChange={({ currentTarget: { value: rule } }) =>
                dispatch(updateJustification(row, { rule }))
              }
              value={rule}
              placeholder="rule"
            />
          </div>
        )
      })}
    </div>
  )
}

export default TruthTree
