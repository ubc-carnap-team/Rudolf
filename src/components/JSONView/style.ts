import { createUseStyles } from 'react-jss'

const useJSS = createUseStyles({
  Bounder: {
    minWidth: '100%',
    position: 'fixed',
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
  },

  TextArea: {
    overflow: 'hidden scroll',
    fontSize: '16px',
  },

  Toggle: {
    backgroundColor: 'black',
    color: 'white',
    fontSize: '13px',
    alignSelf: 'flex-end',
    '&:hover': {
      cursor: 'pointer',
    },
    padding: '2px 10px',
  },
})

export default useJSS
