import React from 'react'

const Spacers = ({ diff }: { diff: number }) => {
  const spacers: JSX.Element[] = []
  const i = diff - 1
  while (spacers.length < i) {
    spacers.push(<div className="spacer" />)
  }

  return <>{spacers}</>
}

export default Spacers
