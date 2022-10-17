import React, {useMemo} from "react";
import {Ini, updateIni, removeIni} from '../store/slice';
import {useForm, SubmitHandler} from 'react-hook-form';
import ParseText2Sections from '../parser';
import {useAppDispatch} from '../hook'

export type InputData = {
    text: string
}

export const IniItem: React.FC<Ini> = ({id, sections}) => {
    const dispatch = useAppDispatch();
    const {handleSubmit, register} = useForm<InputData>();
    const onSubmit: SubmitHandler<InputData> = ({text}) => {
        dispatch(updateIni({
            ini: {
                sections: ParseText2Sections(text),
                id
            }, payloadId: id
        }));
        window.location.reload();
    }
    const linesCount = useMemo(() => 1 + sections.map(({pairs}) => pairs.length).reduce((a, b) => a + b + 2), [sections]);
    const value = useMemo(() => sections
        .map(({title, pairs}) =>
            [`[${title}]`, pairs
                .map(({key, value}) =>
                    [key, value]
                        .join(' = ')).join('\n')]
                .join('\n')).join('\n\n'), [sections]);
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}
                  style={{display: 'flex', flexDirection: 'column', alignItems: "center"}}>
                <textarea id={`${id}-text`}
                          style={{width: '15vw', height: linesCount * 18, maxWidth: '20vw'}}
                          {...register('text')}
                          defaultValue={value}
                />
                <div style={{display: 'flex', width: '15vw', marginTop: 10, justifyContent: "space-between"}}>
                    <input id={`${id}-submit`} style={{display: "block"}} type={'submit'} value={'Сохранить'}/>
                    <button onClick={() => dispatch(removeIni({payloadId: id}))}>Удалить</button>
                </div>
            </form>
        </>
    )
}