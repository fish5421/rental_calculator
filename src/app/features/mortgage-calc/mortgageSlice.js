import { createSlice, createSelector } from "@reduxjs/toolkit";
import { setPurchasePrice, setInterestRate, updateStateBasedOnPropertyData } from "../initial-prop-calc/InitialPropSlice";
import { select } from "@nextui-org/react";

const initialState = {
    downPayment: 0.00,
    interestRate: 0,
    loanTerm: 30,
    monthlyPayment: 0,
    purchasePrice: 0
};

export const mortgageSlice = createSlice({
    name: "mortgage",
    initialState,
    reducers: {
        setDownPayment: (state, action) => {
            state.downPayment = action.payload;
            state.monthlyPayment = calculateMonthlyPayment(state.purchasePrice, state.downPayment, state.interestRate, state.loanTerm);

        },
        setLoanTerm: (state, action) => {
            state.loanTerm = action.payload;
            state.monthlyPayment = calculateMonthlyPayment(state.purchasePrice, state.downPayment, state.interestRate, state.loanTerm);

        },
     
    },
    extraReducers: builder => { 
        builder.addCase(setPurchasePrice.type, (state, action) => {
            // console.log('monthly', state.monthlyPayment);

            state.purchasePrice = action.payload;
            state.monthlyPayment = calculateMonthlyPayment(state.purchasePrice, state.downPayment, state.interestRate, state.loanTerm);
            // console.log('monthly',state.monthlyPayment);

        }),
        builder.addCase(setInterestRate.type, (state, action) => {
            state.interestRate = action.payload;
            state.monthlyPayment = calculateMonthlyPayment(state.purchasePrice, state.downPayment, state.interestRate, state.loanTerm);
        }),
        builder.addCase(updateStateBasedOnPropertyData.type, (state, action) => {
            // Assuming action.payload contains purchasePrice, downPayment, interestRate, loanTerm
            const { price, mortgageRates: { thirtyYearFixedRate: interestRate } } = action.payload;
            state.purchasePrice = price ?? state.purchasePrice;
            state.interestRate = interestRate ?? state.interestRate;

            state.monthlyPayment = calculateMonthlyPayment(state.purchasePrice, state.downPayment, state.interestRate, state.loanTerm);
        });
        
    }
});

// const selectPurchasePrice = createSelector(
//     (state) => state.initialProp.purchasePrice,
//     (purchasePrice) => purchasePrice
// )


export const calculateMonthlyPayment = (purchasePrice, downPayment, interestRate, loanTerm) => {
    const principal = purchasePrice - (purchasePrice * (downPayment / 100));  // Replace 100000 with your purchase_price
    const monthlyInterestRate = (interestRate / 100) / 12;
    const numberOfPayments = loanTerm * 12;

    if (principal > 0 && numberOfPayments > 0) {
        if (monthlyInterestRate === 0) {
            // No interest rate, so simple division
            return principal / numberOfPayments;
        } else {
            // Original mortgage formula when interest rate is not zero
            return principal * [monthlyInterestRate * Math.pow((1 + monthlyInterestRate), numberOfPayments)] / [Math.pow((1 + monthlyInterestRate), numberOfPayments) - 1];
        }
    }
    return 0;
}
export const { setDownPayment, setLoanTerm } = mortgageSlice.actions;
// in mortgageSlice.js



export default mortgageSlice.reducer;