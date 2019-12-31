/* eslint-disable react/jsx-no-undef */
import React, { FC, Fragment, ChangeEventHandler } from 'react'
import LineTo from 'react-lineto'
import AutoSizeInput from 'react-input-autosize'
import { TreeNode } from '../typings/TreeState'
import FormulaView from './FormulaView'
import { CustomDispatch, updateRule } from '../RudolfReducer'

type Props = {
  node: TreeNode
  nextRow: number
  dispatch: CustomDispatch
}

const NodeView: FC<Props> = ({
  node: { rule, id, forest, formulas },
  nextRow,
  dispatch,
}) => {
  // TODO: move to formula
  // const handleLabelChange: ChangeEventHandler<HTMLInputElement> = (event) => {
  //   onChange({
  //     node,
  //     label: event.currentTarget.value,
  //     rule: rule,
  //   })
  // }

  // TODO
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
              nodeId={id}
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
            {/* <Spacers diff={forest[0].row - row} /> */}
            <NodeView
              {...{
                node: forest[0],

                nextRow,
                dispatch,
              }}
            />
          </div>
        ) : (
          <div className="children split">
            {forest.map((child) => {
              return (
                <Fragment key={child.id}>
                  {/* <Spacers diff={child.row - row} /> */}
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
                      nextRow,
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
