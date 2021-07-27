import React, { FC } from 'react'
import NodeView from './NodeView'
import { updateJustification } from '../RudolfReducer'
import nodeviewJSS, { rowHeight } from '../styles/NodeView_styles'
import { range } from '../util/helpers'
import StyledAutosizeInput from './StyledAutosizeInput'
import CustomTooltip from './CustomTooltip'
import { DefaultProps } from '../typings/index'

const TruthTree: FC<DefaultProps> = ({ currentState, feedback, dispatch }) => {
  const classes = nodeviewJSS()
  const { nextRow, tree, justifications } = currentState
  const rows = range(1, nextRow)
  return (
    <CustomTooltip title={!feedback.success ? feedback.errorMessage : ''}>
      <div
        className={classes.TruthTree}
        style={{
          gridTemplateRows: `repeat(${nextRow - 1}, ${rowHeight})`,
        }}
      >
        {rows.map((row) => {
          return (
            <div
              className={classes.RowNumber}
              key={row}
              style={{ gridRow: row }}
            >
              {`${row}.`}
            </div>
          )
        })}
        <div
          className={classes.NodeViewContainer}
          style={{
            gridRow: `1 / span ${rows.length}`,
          }}
        >
          <NodeView
            node={tree}
            dispatch={dispatch}
            justifications={justifications}
            feedbackMap={feedback.success ? feedback.feedback : undefined}
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
                style={{ marginRight: '.1em' }}
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
    </CustomTooltip>
  )
}

export default TruthTree
