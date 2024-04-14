import React from "react";
import { AmmountLabel } from "../../../types/AmmountLabel";



interface RadioInputProps {
    label: AmmountLabel;
    changeAmmount: (e: React.ChangeEvent<HTMLInputElement>) => void;
    selectedAmmount: AmmountLabel;
}

export default function RadioInput({label, changeAmmount, selectedAmmount}: RadioInputProps) {
    return (
        <div className='radio'>
            <label>
            <input type='radio' 
                checked={selectedAmmount === `${label}`}
                onChange={changeAmmount}
                value={label}
            />
            {label}
            </label>
        </div>
    )
}