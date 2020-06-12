import React from 'react'

const Spacers = ({ diff }: { diff: number }) => {
  const spacers: JSX.Element[] = []
  const i = diff
  while (spacers.length < i) {
    spacers.push(<div className="spacer" key={i} />)
  }

  return <div className={`spacers-${diff}`}>{spacers}</div>
}

export default Spacers
