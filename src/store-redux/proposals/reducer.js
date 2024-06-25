import { createSlice } from "@reduxjs/toolkit";

const initialState = {

}


export const createProposalSlice = createSlice({
    name: "proposalState",
    initialState,
    reducers: {
        setAppState: (state, action) => {
            state.appState = action.payload;
        }
    }
})
export const {
    setAppState
} = createProposalSlice.actions;

export default createProposalSlice.reducer;