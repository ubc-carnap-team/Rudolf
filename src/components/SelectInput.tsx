import React, { FormEventHandler } from 'react'

type Props = {
    onSubmit: (premises: string) => void
}

const SelectInput: React.FC<Props> = ({ onSubmit }) => {
    const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault()
        const premises: string = (event.currentTarget as any)[0].value
        onSubmit(premises)
    }

    return (
        <form onSubmit={handleSubmit}>
            <select>
                <option value="examplePremises">Basic Example</option>
                <option value="mp">Modus Ponens</option>
                <option value="dmg">De Morgen's Law</option>
            </select>
            <input type="submit" value="Submit" />
        </form>
    )
}

export default SelectInput
