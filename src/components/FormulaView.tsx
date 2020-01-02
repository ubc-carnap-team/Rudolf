import React, { FC, useState, useRef, Ref, ChangeEventHandler } from 'react'
import { Check } from '@material-ui/icons'
import { CustomDispatch, updateFormula } from '../RudolfReducer'
import { NodeMenu } from './NodeMenu'
import { TreeNode } from '../typings/TreeState'

interface Props {
  row: number
  value: string
  resolved: boolean
  node: TreeNode
  index: number
  dispatch: CustomDispatch
}

const FormulaView: FC<Props> = ({
  index,
  row,
  value,
  resolved,
  dispatch,
  node,
}) => {
  const [contextMenu, setContextMenu] = useState(false)
  const ref: Ref<HTMLDivElement> = useRef(null)
  return (
    <div
      className="formula node"
      ref={ref}
      onContextMenu={(e) => {
        e.preventDefault()
        setContextMenu(true)
      }}
    >
      <span>{row}</span>
      <input
        className="label"
        onChange={(event) =>
          dispatch(updateFormula(node.id, index, event.currentTarget.value))
        }
        value={value}
        placeholder="formula"
      />
      <NodeMenu
        open={contextMenu}
        onClose={() => setContextMenu(false)}
        dispatch={dispatch}
        anchorEl={ref.current as HTMLDivElement}
        index={index}
        node={node}
        formula={{ row, value, resolved }}
      />
      {resolved ? <Check /> : ''}
    </div>
  )
}

export default FormulaView
