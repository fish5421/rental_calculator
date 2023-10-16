import { createSlice, createAction, createAsyncThunk } from "@reduxjs/toolkit";

import { setPurchasePrice, setInterestRate, updateStateBasedOnPropertyData } from "../initial-prop-calc/InitialPropSlice";
import { useSelector } from 'react-redux';
import { calculateMonthlyPayment } from "../mortgage-calc/mortgageSlice";


// Define a new action to update the state
export const updateCashflowBasedOnMortgageData = createAction('cashflow/updateCashflowBasedOnMortgageData');

// Define your Thunk similar to your existing getPropertyData thunk
export const updateCashflowWithMortgage = createAsyncThunk('cashflow/updateWithMortgage', async (_, thunkAPI) => {
    const { dispatch, getState } = thunkAPI;

    try {
        const mortgageState = getState().mortgage;
        console.log("Mortgage State:", mortgageState);
  // Get the mortgage state
        const { monthlyPayment } = mortgageState;   // Retrieve the monthlyPayment from the mortgage state

        dispatch(updateCashflowBasedOnMortgageData({ monthlyPayment }));  // Dispatch another action to update relevant cashflow state

        return { monthlyPayment };
    } catch (err) {
        console.log(err);
    }
});


const initialState = {
    rent: 0,
    propertyTaxes: 0,
    insurance: 0,
    closingCosts: 0,
    upfrontRepairs: 0,
    repairs: 0,
    vacancy: 0,
    capEx: 0,
    mgmtFees: 0,
    electricity: 0,
    gas: 0,
    water: 0,
    garbage: 0,
    hoa: 0,
    monthlyCashflow: 0,
    totalExpenses: 0,
    monthlyPayment: 0,
};

export const cashflowSlice = createSlice({
    name: "cashflow",
    initialState,
    reducers: {
        setRent: (state, action) => {
            state.rent = action.payload;
            state.monthlyCashflow = calculateCashflow(state);

        },
        setPropertyTaxes: (state, action) => {
            state.propertyTaxes = action.payload;
            state.totalExpenses = calculateTotalExpenses(state);
            state.monthlyCashflow = calculateCashflow(state);

        },
        setInsurance: (state, action) => {
            state.insurance = action.payload;
            state.totalExpenses = calculateTotalExpenses(state);
            state.monthlyCashflow = calculateCashflow(state);

        },
        setClosingCosts: (state, action) => {
            state.closingCosts = action.payload;

        },
        setUpfrontRepairs: (state, action) => {
            state.upfrontRepairs = action.payload;

        },
        setRepairs: (state, action) => {
            state.repairs = action.payload
            state.totalExpenses = calculateTotalExpenses(state);
            state.monthlyCashflow = calculateCashflow(state);

        },
        setVacancy: (state, action) => {
            state.vacancy = action.payload;
            state.totalExpenses = calculateTotalExpenses(state);
            state.monthlyCashflow = calculateCashflow(state);

        },
        setCapEx: (state, action) => {
            state.capEx = action.payload;
            state.totalExpenses = calculateTotalExpenses(state);
            state.monthlyCashflow = calculateCashflow(state);

        },
        setMgmtFees: (state, action) => {
            state.mgmtFees = action.payload;
            state.totalExpenses = calculateTotalExpenses(state);
            state.monthlyCashflow = calculateCashflow(state);

        },
        setElectricity: (state, action) => {
            state.electricity = action.payload;
            console.log("electricity", state.electricity)
            state.totalExpenses = calculateTotalExpenses(state);
            state.monthlyCashflow = calculateCashflow(state);

        },
        setGas: (state, action) => {
            state.gas = action.payload;
            state.totalExpenses = calculateTotalExpenses(state);
            state.monthlyCashflow = calculateCashflow(state);

        },
        setWater: (state, action) => {
            state.water = action.payload;
            state.totalExpenses = calculateTotalExpenses(state);
            state.monthlyCashflow = calculateCashflow(state);

        },
        setGarbage: (state, action) => {
            state.garbage = action.payload;
            state.totalExpenses = calculateTotalExpenses(state);
            state.monthlyCashflow = calculateCashflow(state);

        },
        setHoa: (state, action) => {
            state.hoa = action.payload;
            state.totalExpenses = calculateTotalExpenses(state);
            state.monthlyCashflow = calculateCashflow(state);

            
        }
    },
    extraReducers: (builder) => {
        builder.addCase(updateCashflowBasedOnMortgageData.type, (state, action) => {
            console.log("monthlyPayment", action.payload)
            const { monthlyPayment } = action.payload;
            state.monthlyPayment = monthlyPayment;  // Update monthlyPayment
            state.totalExpenses = calculateTotalExpenses(state);
            state.monthlyCashflow = calculateCashflow(state);
            console.log("monthlyCashflow", state.monthlyCashflow)
              // Recalculate total expenses (assuming calculateTotalExpenses is a function you have)
        })
        .addCase(updateStateBasedOnPropertyData.type, (state, action) => {
            const { rentZestimate, propertyTaxRate, price, annualHomeownersInsurance } = action.payload;
            console.log("propertyTaxRate", propertyTaxRate)
            console.log("purchasePrice", price)
            const taxAnnualAmount = (propertyTaxRate * price)/100;
            console.log("taxAnnualAmount", taxAnnualAmount);
            state.insurance = annualHomeownersInsurance ?? state.insurance;

            state.rent = rentZestimate ?? state.rent;
            state.propertyTaxes = taxAnnualAmount ?? state.propertyTaxes;
            state.monthlyCashflow = calculateCashflow(state);
        });
    }
});

const calculateTotalExpenses = (state) => {
    const monthlyPayment = state.monthlyPayment;  // Assume this exists in the same state slice
    const perMonthPropertyTaxes = state.propertyTaxes / 12;
    const perMonthInsurance = state.insurance / 12;

    const percentCosts = ['repairs', 'vacancy', 'capEx', 'mgmtFees']
        .reduce((acc, curr) => acc + (Number(state[curr]) * Number(state.rent) / 100), 0);


    const utilityCosts = ['electricity', 'gas', 'water', 'garbage']
        .reduce((acc, curr) => acc + Number(state[curr]), 0);
    console.log("utilityCosts", utilityCosts);


    return perMonthPropertyTaxes + perMonthInsurance + percentCosts +
        utilityCosts + state.hoa + monthlyPayment;
};


const calculateCashflow = (state) => {
    const totalExpenses = calculateTotalExpenses(state);
    return state.rent - totalExpenses;
};





export const {
    setRent,
    setPropertyTaxes,
    setInsurance,
    setClosingCosts,
    setUpfrontRepairs,
    setRepairs,
    setVacancy,
    setCapEx,
    setMgmtFees,
    setElectricity,
    setGas,
    setWater,
    setGarbage,
    setHoa
} = cashflowSlice.actions;

export default cashflowSlice.reducer;
