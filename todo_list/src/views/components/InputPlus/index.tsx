import React,{FC, useCallback, useEffect, useState} from "react";
import styles from './inde.module.scss';


interface InputPlusProps{
    onAdd: (title:string) => void;
}
export const InputPlus: FC<InputPlusProps> = ({ onAdd,}) =>
{
    const [inputValue, serInputValue]= useState('');
    const addTask = useCallback(()=>{
        onAdd(inputValue);
        serInputValue('');
     },[inputValue])
    return (
        <div className = {styles.inputPlus}>
        <input 
            type = "text"
            className={styles.inputPlusValue}
            value = {inputValue}
            onChange={(evt) =>{
                serInputValue(evt.target.value);
            }}
            onKeyDown={(evt) => {
                if(evt.key == 'Enter'){
                    addTask();
                }

            }}
            placeholder="Type here ..."

        />
        <button
            onClick={() => {
                addTask();
            }}
            aria-label="Add"
            className={styles.inputPlusButton}
        />
        </div>
    )
};