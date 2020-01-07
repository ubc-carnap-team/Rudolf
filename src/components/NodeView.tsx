/* eslint-disable react/jsx-no-undef */
import React, { FC, Fragment, ChangeEventHandler } from 'react'
import LineTo from 'react-lineto'
import AutoSizeInput from 'react-input-autosize'
import { TreeNode } from '../typings/TreeState'
import FormulaView from './FormulaView'
import { CustomDispatch, updateRule } from '../RudolfReducer'
import { lastRow, firstRow } from '../util/nodes'
import Spacers from './Spacers'

type Props = {
  node: TreeNode
  dispatch: CustomDispatch
}

const NodeView: FC<Props> = ({
  node,
  node: { rule, id, forest, formulas },
  dispatch,
}) => {
  const handleRuleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    dispatch(updateRule(id, event.currentTarget.value))
  }

  return (
    <div className={`node-container `}>
      <div
        className={`node-id=${id}`}
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
        (
        <AutoSizeInput
          className="rule"
          onChange={handleRuleChange}
          value={rule}
          placeholder="rule"
        />
        )
        {forest === 'contradiction' && (
          <div className="closed-branch-marker">X</div>
        )}
        {forest === 'finished' && (
          <div className="finished-branch-marker">O</div>
        )}
      </div>

      {Array.isArray(forest) &&
        forest.length > 0 &&
        (forest.length === 1 ? (
          <div className="children stack">
            <Spacers diff={firstRow(forest[0]) - lastRow(node)} />
            <NodeView node={forest[0]} dispatch={dispatch} />
          </div>
        ) : (
          <div className="children split">
            {forest.map((child) => {
              return (
                <Fragment key={child.id}>
                  {/* <Spacers diff={child.row - row} /> */}
                  <LineTo
                    from={`node-id=${id}`}
                    isemptyArray
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
        ))}
    </div>
  )
}

export default NodeView
