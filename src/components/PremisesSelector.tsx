import React, { FormEventHandler } from 'react'

type Props = {
    onChange: (premises: string) => void
}

const PremisesSelector: React.FC<Props> = ({ onChange }) => {
    const handleSubmit: FormEventHandler<HTMLSelectElement> = (event) => {
        event.preventDefault()
        const premises: string = (event.currentTarget as any)[0].value
        onChange(premises)
    }

    return (
        <select onChange={handleSubmit}>
            <option value="P->Q,P,~Q">Basic Example</option>
            <option value="P->Q">Modus Ponens</option>
            <option value="~PvQ">De Morgen's Law</option>
        </select>
    )
}

export default PremisesSelector
