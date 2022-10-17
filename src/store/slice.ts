import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface Ini {
    sections: Section[],
    id: number
}

export interface Section {
    title: string,
    pairs: Pair[]
}

export interface Pair {
    key: string,
    value: string
}

// const initialState: { inis: Ini[] } = {
//     inis: [
//         {
//             id: Date.now(),
//             sections: [
//                 {
//                     title: 'FirstSection',
//                     pairs: [{key: 'key', value: 'value'}, {key: 'word', value: 'aboba'}]
//                 },
//                 {
//                     title: 'NewSection',
//                     pairs: [{key: 'key', value: 'value'}, {key: 'word', value: 'aboba'}]
//                 },
//                 {
//                     title: 'NewSection',
//                     pairs: [{key: 'key', value: 'value'}, {key: 'word', value: 'aboba'}]
//                 }, {
//                     title: 'NewSection',
//                     pairs: [{key: 'key', value: 'value'}, {key: 'word', value: 'aboba'}]
//                 }
//             ]
//         }
//     ]
// };

const initialState: {inis: Ini[]} = {inis: []}

export const slice = createSlice({
    name: 'inis',
    initialState,
    reducers: {
        addIni({inis}, action: PayloadAction<Ini>) {
            inis.push(action.payload);
        },
        removeIni(state, {payload: {payloadId}}: PayloadAction<{ payloadId: number }>) {
            state.inis = state.inis.filter(({id}) => id !== payloadId)
        },
        updateIni({inis}, {payload: {payloadId, ini}}: PayloadAction<{ payloadId: number, ini: Ini }>) {
            const index = inis.findIndex(({id}) => id === payloadId);
            if (index !== -1) inis[index] = ini;
        }
    }
});

export const {addIni, updateIni, removeIni} = slice.actions;
export default slice.reducer;