import { createSlice } from "@reduxjs/toolkit";
 
const initialState = {
    selectedCupcake: null
};
 
const cupcakeSlice = createSlice({
    name: "cupcake",
    initialState,
    reducers: {
        selectCupcake: (state, action) => {
            state.selectedCupcake = action.payload;
        }
    }
});
 
export const { selectCupcake } = cupcakeSlice.actions;
export default cupcakeSlice.reducer;