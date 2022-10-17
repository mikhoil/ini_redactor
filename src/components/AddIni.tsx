import React from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {addIni} from "../store/slice";
import ParseText2Sections from "../parser";
import {InputData} from "./IniItem";
import {useAppDispatch} from "../hook";
import {useState} from "react";

export default function GenerateId() {
    return Math.trunc(Math.random() * 1000);
}

export const AddIni: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const dispatch = useAppDispatch();
    const {register, handleSubmit, reset} = useForm<InputData>();
    const onSubmit: SubmitHandler<InputData> = ({text}) => {
        dispatch(addIni({
            sections: ParseText2Sections(text),
            id: GenerateId()
        }));
        reset();
    }
    return (
        <>
            <button onClick={() => setIsVisible(prevState => !prevState)}>+</button>
            <dialog open={isVisible} style={{
                marginTop: '3vh',
                padding: '1vw',
                backgroundColor: 'lightgray'
            }}>
                <form style={{display: 'flex', flexDirection: "column"}} onSubmit={handleSubmit(onSubmit)}>
                    <textarea style={{maxWidth: '15vw', minWidth: '14vw', height: '15vh'}} {...register('text')}/>
                    <input type="submit" onClick={() => setIsVisible(false)}/>
                </form>
                <span style={{position: 'absolute', left: '94%', top: -5, cursor: "pointer", color: "red"}}
                      onClick={() => setIsVisible(false)}>&times;</span>
            </dialog>
        </>
    )
}