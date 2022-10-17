import React, {useState} from "react";
import {SubmitHandler, useForm, useFieldArray, FormProvider} from "react-hook-form";
import {Ini, Section, updateIni} from "../store/slice";
import {ContentRedactor} from "./ContentRedactor";
import {useAppDispatch} from "../hook";

export type FormValues = {
    sections: Section[]
}

export const IniRedactor: React.FC<Ini> = ({id, sections}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useAppDispatch();
    const methods = useForm<FormValues>({defaultValues: {sections: sections}});
    const {handleSubmit, control} = methods;
    const {fields, append} = useFieldArray({control, name: 'sections'})
    const onSubmit: SubmitHandler<FormValues> = ({sections}) => {
        dispatch(updateIni({
            ini: {sections, id},
            payloadId: id
        }));
        window.location.reload();
    }
    return (
        <>
            <button onClick={() => setIsOpen(prevState => !prevState)}>Редактировать</button>
            <dialog open={isOpen} style={{height: 'auto', backgroundColor: 'lightgray', marginTop: 'auto'}}>
                <div style={{display: 'flex'}}>
                    <FormProvider {...methods}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {fields.map((field, index) => (
                                <div key={field.id}>
                                    <ContentRedactor key={field.id} title={field.title} sectionIndex={index}/>
                                </div>
                            ))}
                            <button onClick={() => append({title: '', pairs: []})}>Добавить секцию</button>
                            <input style={{display: "block", margin: 'auto'}} type="submit"
                                   onClick={() => setIsOpen(false)}
                            />
                        </form>
                    </FormProvider>
                    <span style={{cursor: "pointer", color: "red", marginTop: -15, marginRight: -10}}
                          onClick={() => setIsOpen(false)}
                    >&times;</span>
                </div>
            </dialog>
        </>
    )
}