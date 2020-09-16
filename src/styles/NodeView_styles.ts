import { createUseStyles } from 'react-jss'

export const rowHeight = '1.5em'
export const feedbackSize = '1em'
export const rowGap = '.75em'
const columnGap = '.5em'

const nodeviewJSS = createUseStyles({
  TruthTree: {
    display: 'grid',
    padding: '0.2em',
    gridTemplateColumns:
      '[rowNumber] auto [nodeView] auto [justification] auto',
    placeItems: 'center',
    columnGap,
    rowGap,
  },

  RowNumber: {
    gridColumn: 'rowNumber',
    marginLeft: '.5em',
  },

  Justification: {
    gridColumn: 'justification',
    display: 'flex',
    alignSelf: 'start',
    alignItems: 'center',
    marginRight: '.5em',
    height: rowHeight,
  },

  NodeViewContainer: {
    gridColumn: 'nodeView',
  },

  NodeView: {
    display: 'grid',
    textAlign: 'center',
    columnGap,
    rowGap,
  },

  FormulaBounder: {
    display: 'grid',
    borderRadius: '.2em',
    borderWidth: '.1em',
    borderStyle: 'solid',
    borderColor: 'transparent',
    rowGap,
  },

  Tooltip: {
    fontSize: '3em',
  },
})

export default nodeviewJSS
