import { useEffect, useContext, useState } from 'react';
// import { LightContext } from '../components/LightContext';
// import Map from '../components/Map';
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { useSelector, useDispatch } from 'react-redux';
import { setDownPayment, setLoanTerm } from './app/features/mortgage-calc/mortgageSlice';
import { Dropdown, Link, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { setInterestRate } from './app/features/initial-prop-calc/InitialPropSlice';
import { motion } from "framer-motion";




export default function MortgageCalculation() {
    const down_payment = useSelector(state => state.mortgage.downPayment);
    const interest_rate = useSelector(state => state.initProp.interestRate);
    const loan_term = useSelector(state => state.mortgage.loanTerm);
    const monthly_payment = useSelector(state => state.mortgage.monthlyPayment);
    const purchase_price = useSelector(state => state.initProp.purchasePrice);
    const dispatch = useDispatch();
    const [animate, setAnimate] = useState(false);


    const valueChange = {
        initial: { scale: 1, opacity: 1 },
        animate: { scale: 1.4, opacity: 0.7, y: -10 },
        exit: { scale: 1, opacity: 1, y: 0 },
        transition: { duration: 0.3 }
    };

    const hoverEffect = {
        hover: { scale: 1.1 }
    };




    return (
        <div className='w-full'>
            <h1 className='text-2xl font-bold mb-4 text-left pl-[1.1rem]'>Mortgage Calculation</h1>

            <motion.div className="flex w-full justify-between items-start mb-4 hover:text-blue-600 hover:border-blue-600 transition-colors duration-150 ease-linear border-b border-gray-300 p-[1.1rem] py-4"
                whileHover={"hover"}>
                <div className="flex flex-col p-0 m-0 text-left">
                    <label className='p-0 m-0'>Down Payment</label>
                    <small className="text-sm text-gray-500 p-0 m-0">Typically 20% of Purchase Price</small>
                </div>
                <div className='flex flex-col space-y-2 items-end'>
                    <Input
                        type="number"
                        placeholder="0.00"
                        min={0}
                        labelPlacement="outside"
                        endContent={
                            <div className="pointer-events-none flex items-center">
                                <span className="text-default-400 text-small">%</span>
                            </div>
                        }
                        className='w-1/2'
                        value={down_payment}
                        onChange={(e) => {
                            dispatch(setDownPayment(e.target.value));
                            setAnimate(true);
                            setTimeout(() => setAnimate(false), 300);
                        }
                        }
                    />
                    <motion.div initial={animate ? "initial" : "exit"} animate={animate ? "animate" : "exit"} exit="exit" variants={valueChange}>
                        {/* Show the down payment dollar amount here */}
                        <span className=" text-default-500 text-xs ">
                            {((down_payment * purchase_price) / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                        </span>
                    </motion.div>
                    <input className="w-1/2 accent-indigo-600" type="range" name="" value={down_payment} min="0" max="100" onInput={
                        (e) =>{dispatch(setDownPayment(e.target.value));
                            setAnimate(true);
                            setTimeout(() => setAnimate(false), 300);} 
                    }
                        
                    />
                </div>
            </motion.div>

            <div className="flex w-full justify-between items-start mb-4 hover:text-blue-600 hover:border-blue-600 transition-colors duration-150 ease-linear border-b border-gray-300 p-[1.1rem] py-4">
                <div className="flex flex-col p-0 m-0 text-left">
                    <label className='p-0 m-0'>Interest Rate</label>
                    <small className="text-sm text-gray-500 p-0 m-0">Typically 4-8% of Purchase Price</small>
                </div>
                <div className='flex flex-col space-y-2 items-end'>
                    <Input
                        type="number"
                        placeholder="0.00"
                        min={0}
                        labelPlacement="outside"
                        endContent={
                            <div className="pointer-events-none flex items-center">
                                <span className="text-default-400 text-small">%</span>
                            </div>
                        }
                        className='w-1/2'
                        value={interest_rate}
                        onChange={(e) => dispatch(setInterestRate(e.target.value))}
                    />
                    <input className="w-1/2 accent-indigo-600" type="range" name="" value={interest_rate} min="0" max="100" onInput={(e) => dispatch(setInterestRate(e.target.value))} />
                </div>
            </div>

            <div className="flex w-full justify-between items-start mb-4 hover:text-blue-600 hover:border-blue-600 transition-colors duration-150 ease-linear border-b border-gray-300 p-[1.1rem] py-4">
                <div className="flex flex-col p-0 m-0 text-left">
                    <label className='p-0 m-0'>Loan Term</label>
                    <small className="text-sm text-gray-500 p-0 m-0">Typically 30 Year Fixed</small>
                </div>
                <Dropdown backdrop="blur">
                    <DropdownTrigger>
                        <Button
                            variant="bordered"
                            color='primary'

                        >
                            {loan_term === "" ? "Select Loan Term" : `${loan_term} Year`}
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu variant="faded" aria-label="Static Actions">
                        <DropdownItem key="10" onClick={(e) => dispatch(setLoanTerm("10"))}>10</DropdownItem>

                        <DropdownItem key="15" onClick={(e) => dispatch(setLoanTerm("15"))}>15</DropdownItem>

                        <DropdownItem key="20" onClick={(e) => dispatch(setLoanTerm("20"))}>20</DropdownItem>

                        <DropdownItem key="25" onClick={(e) => dispatch(setLoanTerm("25"))}>25</DropdownItem>

                        <DropdownItem key="30" onClick={(e) => dispatch(setLoanTerm("30"))}>30</DropdownItem>

                    </DropdownMenu>
                </Dropdown>

            </div>


            <div className="flex w-full justify-between items-start mb-4 hover:text-blue-600 hover:border-blue-600 transition-colors duration-150 ease-linear border-b border-gray-300 p-[1.1rem] py-4">
                <h2 className='text-xl font-bold mb-4 text-left'>Your monthly Payment</h2>
                <p>${Math.round(monthly_payment)}</p>
            </div>
        </div>
    )
}