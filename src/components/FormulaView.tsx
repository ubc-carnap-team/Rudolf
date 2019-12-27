import React, { FC, useState, useRef, Ref } from 'react'
import { Check } from '@material-ui/icons'
import { CustomDispatch } from '../RudolfReducer'
import { NodeMenu } from './NodeMenu'

interface Props {
  row: number
  value: string
  resolved: boolean
  nodeId: string
  index: number
  dispatch: CustomDispatch
}

const FormulaView: FC<Props> = ({
  index,
  nodeId,
  row,
  value,
  resolved,
  dispatch,
}) => {
  const [contextMenu, setContextMenu] = useState(false)
  const ref: Ref<HTMLDivElement> = useRef(null)
  return (
    <div className="formula node" ref={ref}>
      <span>{row}</span>
      <input
        className="label"
        // TODO
        onContextMenu={() => setContextMenu(true)}
        //   onChange={handleFormulaChange}
        value={value}
        placeholder="formula"
      />
      <NodeMenu
        open={contextMenu}
        onClose={() => setContextMenu(false)}
        dispatch={dispatch}
        anchorEl={ref.current as HTMLDivElement}
        index={index}
        nodeId={nodeId}
      />
      {resolved ? <Check /> : ''}
    </div>
  )
}

export default FormulaView
