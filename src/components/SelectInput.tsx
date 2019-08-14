import React, { FormEventHandler } from 'react'

type Props = {
    onSubmit: (premises: string) => void
}

const PremisesSelector: React.FC<Props> = ({ onSubmit }) => {
    const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault()
        const premises: string = (event.currentTarget as any)[0].value
        onSubmit(premises)
    }

    return (
        <form onChange={handleSubmit}>
            <select>
                <option value="P->Q,P,~Q">Basic Example</option>
                <option value="P->Q">Modus Ponens</option>
                <option value="~PvQ">De Morgen's Law</option>
            </select>
        </form>
    )
}

export default PremisesSelector
