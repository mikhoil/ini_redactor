import React from "react";
import {useAppSelector} from '../hook'
import {IniItem} from './IniItem';
import {AddIni} from "./AddIni";
import {IniRedactor} from "./IniRedactor";

export const IniList: React.FC = () => {
    const data = useAppSelector(state => state.inis);
    return (
        <>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-around', marginTop: 15}}>
                {data?.map(({id, sections}) => (
                    <div>
                        <IniItem key={id} id={id} sections={sections}/>
                        <IniRedactor id={id} sections={sections}/>
                    </div>
                ))}
            </div>
            <AddIni/>
        </>
    )
}