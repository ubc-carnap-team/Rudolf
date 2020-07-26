import { createUseStyles } from 'react-jss'

export const rowHeight = '1.5em'

const nodeviewJSS = createUseStyles({
  NodeViewBaseContainer: {
    display: 'grid',
    padding: '0.2em',
    textAlign: 'center',
    gridTemplateColumns:
      '[rowNumber] auto [nodeView] auto [justification] auto',
    placeItems: 'center',
  },

  RowNumber: {
    gridColumn: 'rowNumber',
  },

  Justification: {
    gridColumn: 'justification',
  },
})

export default nodeviewJSS
