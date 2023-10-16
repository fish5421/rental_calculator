import { configureStore, combineReducers } from "@reduxjs/toolkit";
import mortgageReducer from "../app/features/mortgage-calc/mortgageSlice";
import initialPropReducer from "../app/features/initial-prop-calc/InitialPropSlice";
import cashflowReducer from "../app/features/cash-flow-calc/cashFlowSlice";

export const store = configureStore({
    reducer: {
        mortgage: mortgageReducer,
        initProp: initialPropReducer,
        cashFlow: cashflowReducer

    },
});
