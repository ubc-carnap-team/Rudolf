/* eslint-disable react/jsx-no-undef */
import React, { FC, Fragment, ChangeEventHandler } from 'react'
import LineTo from 'react-lineto'
import AutoSizeInput from 'react-input-autosize'
import { TreeNode } from '../typings/TreeState'
import FormulaView from './FormulaView'
import { CustomDispatch, updateRule } from '../RudolfReducer'
import { lastRow, firstRow } from '../util/nodes'
import Spacers from './Spacers'
import { isNonEmptyArray } from '../util/util'

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
  const spacers = isNonEmptyArray(forest) ? (
    <Spacers diff={firstRow(forest[0]) - lastRow(node)} />
  ) : (
    undefined
  )

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

      {Array.isArray(forest) && forest.length > 0 && (
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
      )}
    </div>
  )
}

export default NodeView
