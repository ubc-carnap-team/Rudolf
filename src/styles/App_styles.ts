import { createUseStyles } from 'react-jss'

const appJSS = createUseStyles({
  AppBounder: {
    color: 'black',
    fontSize: 'calc(10px + 2vmin)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '1em',
  },

  TopItemsBounder: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  TreeBounder: {
    borderColor: 'black',
    borderStyle: 'solid',
    '&::-webkit-scrollbar': {
      height: '6px',
      width: '6px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'black',
    },
  },
})

export default appJSS
