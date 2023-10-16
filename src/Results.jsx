import { useEffect, useContext, useState } from 'react';
// import { LightContext } from '../components/LightContext';
// import Map from '../components/Map';
import { Input } from "@nextui-org/react";
import { Card, CardFooter, CardBody, Image, Button } from "@nextui-org/react";
import { updateCashflowWithMortgage } from './app/features/cash-flow-calc/cashFlowSlice';

import { useSelector, useDispatch } from 'react-redux';
import { setDownPayment, setLoanTerm } from './app/features/mortgage-calc/mortgageSlice';
import { Dropdown, Link, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { setInterestRate } from './app/features/initial-prop-calc/InitialPropSlice';
import { motion } from "framer-motion";

export default function Results() {
    const purchase_price = useSelector(state => state.initProp.purchasePrice);
    const down_payment = useSelector(state => state.mortgage.downPayment);
    const address = useSelector(state => state.initProp.address);
    const isLoading = useSelector(state => state.initProp.isLoading);
    const rent = useSelector(state => state.cashFlow.rent);
    const property_taxes = useSelector(state => state.cashFlow.propertyTaxes);
    const insurance = useSelector(state => state.cashFlow.insurance);
    const closing_costs = useSelector(state => state.cashFlow.closingCosts);
    const upfront_repairs = useSelector(state => state.cashFlow.upfrontRepairs);
    const repairs = useSelector(state => state.cashFlow.repairs);
    const vacancy = useSelector(state => state.cashFlow.vacancy);
    const capEx = useSelector(state => state.cashFlow.capEx);
    const mgmtFees = useSelector(state => state.cashFlow.mgmtFees);
    const electricity = useSelector(state => state.cashFlow.electricity);
    const gas = useSelector(state => state.cashFlow.gas);
    const water = useSelector(state => state.cashFlow.water);
    const garbage = useSelector(state => state.cashFlow.garbage);
    const hoa = useSelector(state => state.cashFlow.hoa);
    const monthly_payment = useSelector(state => state.mortgage.monthlyPayment);
    // let totalExpenses = 0;
    const downPaymentCost = (down_payment * purchase_price) / 100;
    const closingCost = (closing_costs * purchase_price) / 100;
    const totalInvestment = Number(downPaymentCost) + Number(closingCost) + Number(upfront_repairs);
    console.log('Total Investment:', totalInvestment);
    const totalExpenses = useSelector(state => state.cashFlow.totalExpenses);
    const monthly_cash_flow = useSelector(state => state.cashFlow.monthlyCashflow);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(updateCashflowWithMortgage());

    }
        , [purchase_price, down_payment, rent, property_taxes, insurance, closing_costs, upfront_repairs, repairs, vacancy, capEx, mgmtFees, electricity, gas, water, garbage, hoa, monthly_payment]);


    // const monthly_cash_flow = rent - totalExpenses;

    // Check the value of mgmtFees before constructing dataList



    const dataList = [
        {
            label: 'Monthly Mortgage Payment',
            selector: monthly_payment
        },
        {
            label: 'Property Taxes',
            selector: property_taxes / 12
        },
        {
            label: 'Insurance',
            selector: insurance / 12
        },
        {
            label: 'Repairs and Maintenance',
            selector: (rent * repairs) / 100
        },
        {
            label: 'Vacancy',
            selector: (rent * vacancy) / 100
        },
        {
            label: 'CapEx',
            selector: (rent * capEx) / 100
        },
        {
            label: 'Management Fees',
            selector: (rent * mgmtFees) / 100
        },
        {
            label: 'Electricity',
            selector: electricity
        },
        {
            label: 'Gas',
            selector: gas
        },
        {
            label: 'Water',
            selector: water
        },
        {
            label: 'Garbage',
            selector: garbage
        },
        {
            label: 'HOA',
            selector: hoa
        }
    ];


    const cashFlowList = [
        {
            label: 'Monthly Rental Income',
            selector: rent
        },
        {
            label: 'Monthly Expenses',
            selector: totalExpenses
        },
        {
            label: 'Monthly Cash Flow',
            selector: monthly_cash_flow
        }
    ];


    const formatToUSD = (value) => {
        return Number(value).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };
    // Using reduce to get total expenses

    // totalExpenses = dataList.reduce((acc, curr) => {
    //     // Log the label and selector value for each entry during the reduction
    //     return acc + curr.selector;
    // }, 0);

    // Check the final total expenses
    console.log('Total Expenses:', totalExpenses);

    let cocReturn = ((monthly_cash_flow || 0) * 12) / (totalInvestment || 1) * 100;
    cocReturn = isNaN(cocReturn) ? 'N/A' : cocReturn.toFixed(2) + '%';





    const isPositiveCashFlow = monthly_cash_flow > 0;

    // Choose image based on cashflow
    const gradientClass = isPositiveCashFlow ? 'bg-green-gradient' : 'bg-red-gradient';
    const cashFlowText = isPositiveCashFlow ? 'Positive Cashflow' : 'Negative Cashflow';






    const ExpenseLineItem = ({ label, value }) => (
        <div className="flex w-full justify-between items-center border-b border-gray-300 py-1 pr-2">
            <label className='text-xs text-left'>{label}:</label>
            <p className='text-xs'>{formatToUSD(value || 0)}</p>
        </div>
    );


    return (
        <div className="flex flex-wrap md:flex-nowrap gap-4 sticky top-0 bg-white  p-4 rounded-xl" id='results'>
            <div className="flex flex-col w-full md:w-1/2">
                <h1 className=' font-bold text-left'>Property Info</h1>
                <div className="flex w-full justify-between items-center border-b border-gray-300 py-2 pr-2">
                    <label>Addres:</label>
                    <p className='text-sm text-end truncate' style={{ maxWidth: '150px' }} title={address}>
                        {address}
                    </p>
                </div>
                <div className="flex w-full justify-between items-center border-b border-gray-300 py-2 pr-2">
                    <label>Purchase Price:</label>
                    <p>{formatToUSD(purchase_price)}</p>
                </div>
                <div className="flex w-full justify-between items-center  border-b border-gray-300 py-2 pr-2">
                    <label>Loan Amount:</label>
                    <p>{formatToUSD(purchase_price - (down_payment * purchase_price) / 100)}</p>
                </div>

                <h1 className='font-bold text-left mt-4 border-b border-gray-300'>
                    Monthly Expenses: {formatToUSD(totalExpenses)}

                </h1>
                {dataList.map((item, index) => (
                    <ExpenseLineItem key={index} label={item.label} value={item.selector} />
                ))}

            </div>
            <div className="flex flex-col w-full md:w-1/2">
                <h1 className=' font-bold text-left'>
                    Initial Investment: <span className='text-sm'>{formatToUSD(totalInvestment)}</span>
                </h1>
                <div className="flex w-full justify-between items-center border-b border-gray-300 py-2 pr-2">
                    <label>Down Payment:</label>
                    <p>{formatToUSD((down_payment * purchase_price) / 100)}</p>
                </div>
                <div className="flex w-full justify-between items-center border-b border-gray-300 py-2 pr-2">
                    <label>Closing Costs:</label>
                    <p>{formatToUSD((closing_costs * purchase_price) / 100)}</p>
                </div>
                <div className="flex w-full justify-between items-center  border-b border-gray-300 py-2 pr-2">
                    <label>Initial Repairs:</label>
                    <p>{formatToUSD(upfront_repairs)}</p>
                </div>
                <h1 className='font-bold text-left mt-4 border-b border-gray-300'>
                    Net Cash Flow

                </h1>
                {cashFlowList.map((item, index) => (
                    <ExpenseLineItem key={index} label={item.label} value={item.selector} />
                ))}
                <div className="flex w-full justify-between items-center py-1 pr-2">
                    <label className='text-xs text-left'>Annual Cash Flow:</label>
                    <p className='text-xs'>{formatToUSD((monthly_cash_flow || 0) * 12)}</p>
                </div>

                <Card
                    isBlurred
                    className={` mt-2 border-none bg-background/60 dark:bg-default-100/50 max-w-[610px] h-[200px]  ${gradientClass}`}
                    shadow="sm"
                >
                    <CardBody>
                        <div className="grid md:gap-4">
                            <div className="relative col-span-8 md:col-span-4 flex items-center justify-center">
                                <span className={`text-lg font-semibold ${isPositiveCashFlow ? 'text-gray-600' : 'text-gray-600'}`}>
                                    Cash on Cash (CoC) Return: {cocReturn}
                                </span>
                            </div>
                        </div>
                    </CardBody>
                    <CardFooter className="justify-center before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                        
                        <span className={`text-sm font-semibold ${isPositiveCashFlow ? 'text-gray-600' : 'text-gray-600'}`}>
                            {cashFlowText}
                        </span>                        
                        {/* <Button className="text-tiny text-white bg-black/20" variant="flat" color="default" radius="lg" size="sm">
                            Notify me
                        </Button> */}
                    </CardFooter>
                </Card>
            </div>

        </div>
    )

}
