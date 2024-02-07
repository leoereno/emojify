import React from "react";

export default function({label, changeAmmount, selectedAmmount}) {
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