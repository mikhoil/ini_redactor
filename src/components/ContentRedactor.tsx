import React from "react";
import {useFieldArray, useFormContext} from "react-hook-form";
import {FormValues} from "./IniRedactor";

interface PairsRedactorProps {
    sectionIndex: number,
    title: string
}

export const ContentRedactor: React.FC<PairsRedactorProps> = ({sectionIndex, title}) => {
    const {control, register} = useFormContext<FormValues>();
    const {fields, append} = useFieldArray({control, name: `sections.${sectionIndex}.pairs`});
    return (
        <>
            <input
                placeholder={'title'}
                type="text"
                {...register(`sections.${sectionIndex}.title` as const, {required: true})}
            />
            {fields.map((field, index) => (
                <div key={field.id}>
                    <input
                        placeholder={'key'}
                        type={'text'}
                        {...register(`sections.${sectionIndex}.pairs.${index}.key` as const, {required: true})}
                    />{' = '}
                    <input
                        placeholder={'value'}
                        type={!isNaN(parseInt(field.value)) ? 'number' : 'text'}
                        {...register(`sections.${sectionIndex}.pairs.${index}.value` as const, {required: true})}
                    />
                </div>
            ))}
            <button onClick={() => append({key: '', value: ''})}>Добавить ключ/значение</button>
        </>
    )
}