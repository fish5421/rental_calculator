import { createSlice, createAction, createAsyncThunk } from "@reduxjs/toolkit";

const rapid_key = import.meta.env.VITE_RAPID_API_KEY


const initialState = {
    purchasePrice: 0.00,
    address: "",
    isLoading: false,
    interestRate: 0,

};

;
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': rapid_key,
        'X-RapidAPI-Host': 'zillow-com1.p.rapidapi.com'
    }
};

export const updateStateBasedOnPropertyData = createAction('mortgage/updateStateBasedOnPropertyData');

export const getPropertyData = createAsyncThunk('initialProp/getPropertyData', async (address, thunkAPI) => {
    const { dispatch } = thunkAPI;
    const url = `https://zillow-com1.p.rapidapi.com/property?address=${encodeURIComponent(address)}`;
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        dispatch(updateStateBasedOnPropertyData(data));  // Dispatch another action to update relevant state
        console.log(data);
        return data;
    } catch (err) {
        console.log(err);
    }
});

export const initialPropSlice = createSlice({
    name: "initialProp",
    initialState,
    reducers: {
        setPurchasePrice: (state, action) => {
            // console.log(state, action.payload);
            state.purchasePrice = action.payload;

        },
        setAddress: (state, action) => {
            // console.log(state, action.payload);
            state.address = action.payload;
        },
        setInterestRate: (state, action) => {
            state.interestRate = action.payload;
        }
    },
    extraReducers: {
        [getPropertyData.fulfilled]: (state, action) => {
            state.isLoading = false;
            console.log(action.payload);
            state.purchasePrice = action.payload.price;
            state.interestRate = action.payload.mortgageRates.thirtyYearFixedRate
        },
        [getPropertyData.rejected]: (state, action) => {
            state.isLoading = false;
            console.log(action.payload);
            state.purchasePrice = 0;
        },
        [getPropertyData.pending]: (state) => {
            state.isLoading = true;
            state.purchasePrice = 0;
        }

    }
});



export const { setPurchasePrice, setAddress, setInterestRate } = initialPropSlice.actions;

export default initialPropSlice.reducer;