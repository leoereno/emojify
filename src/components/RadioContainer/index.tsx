import React from "react";
import { useState } from "react";
import RadioInput from "./RadioInput";
import { AmmountLabel } from "../../types/AmmountLabel";

interface RadioContainerProps {
    selectedAmmount: AmmountLabel;
    setSelectedAmmount: React.Dispatch<React.SetStateAction<string>>

}

export default function RadioContainer({selectedAmmount, setSelectedAmmount}: RadioContainerProps){

    const changeAmmount = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedAmmount(e.target.value);
        console.log(selectedAmmount)
      }

    return(
        <div className='radioContainer'>
            <h3>Set emoji level:</h3>
            <RadioInput label='low' selectedAmmount={selectedAmmount} changeAmmount={changeAmmount}/>
            <RadioInput label='moderate' selectedAmmount={selectedAmmount} changeAmmount={changeAmmount}/>
            <RadioInput label='high' selectedAmmount={selectedAmmount} changeAmmount={changeAmmount}/>
        
        </div>
    )
}