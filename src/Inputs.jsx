import { useEffect, useContext, useState } from 'react';
// import { LightContext } from '../components/LightContext';
// import Map from '../components/Map';
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { useSelector, useDispatch } from 'react-redux';
import { Dropdown, Link, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import MortgageCalculation from '../src/MortgageCalculation';
import Results from '../src/Results';
import { setPurchasePrice, getPropertyData, setAddress } from './app/features/initial-prop-calc/InitialPropSlice';
import { setRent, setPropertyTaxes, setInsurance, setClosingCosts, setUpfrontRepairs, setRepairs, setVacancy, setCapEx, setMgmtFees, setElectricity, setGas, setWater, setGarbage, setHoa } from './app/features/cash-flow-calc/cashFlowSlice';
import { m, motion } from "framer-motion";





// import IntInput from './IntInput/IntInput';

export default function Inputs() {
    const purchase_price = useSelector(state => state.initProp.purchasePrice);
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
    const [animateTriggers, setAnimateTriggers] = useState({});

    const valueChange = {
        initial: { scale: 1, opacity: 1 },
        animate: { scale: 1.4, opacity: 0.7, y: -10 },
        exit: { scale: 1, opacity: 1, y: 0 },
        transition: { duration: 0.3 }
    };

    // const purchase_price  = 100000;

    const dispatch = useDispatch();

    const createAction = (label, dispatchFunction, setStateFunc) => (e) => {
        dispatch(dispatchFunction(e.target.value));
        setStateFunc(prevState => ({ ...prevState, [label]: true }));
        setTimeout(() => setStateFunc(prevState => ({ ...prevState, [label]: false })), 300);
    };

    // import { setPurchasePrice} from './app/features/mortgage-calc/mortgageSlice';
    const dataList = [
        {
            label: 'Rent',
            placeholder: '0.00',
            hint: 'Monthly rent amount',
            endContentSymbol: '$',
            selector: rent,
            action: ((e) => dispatch(setRent(e.target.value)))
        },
        {
            label: 'Property Taxes',
            placeholder: '0.00',
            hint: 'Annual property taxes',
            endContentSymbol: '$',
            selector: property_taxes,
            action: ((e) => dispatch(setPropertyTaxes(e.target.value)))
        },
        {
            label: 'Insurance',
            placeholder: '0.00',
            hint: 'Annual insurance cost',
            endContentSymbol: '$',
            selector: insurance,
            action: ((e) => dispatch(setInsurance(e.target.value)))
        },
        {
            label: 'Closing Costs',
            placeholder: '0.00',
            hint: 'Typically 3-7% of Purchase Price',
            endContentSymbol: '%',
            selector: closing_costs,
            action: createAction('Closing Costs', setClosingCosts, setAnimateTriggers),            
            optional: purchase_price
        },
        {
            label: 'Upfront Repairs',
            placeholder: '0.00',
            hint: 'Initial repair costs',
            endContentSymbol: '$',
            selector: upfront_repairs,
            action: ((e) => dispatch(setUpfrontRepairs(e.target.value)))
        },
        {
            label: 'Repairs and Maintenance',
            placeholder: '0.00',
            hint: 'Typically 5-15% of Monthly Rent',
            endContentSymbol: '%',
            selector: repairs,
            action: createAction('Repairs and Maintenance', setRepairs, setAnimateTriggers),            
            optional: rent
        },
        {
            label: 'Vacancy',
            placeholder: '0.00',
            hint: 'Typically 3-10% of Monthly Rent',
            endContentSymbol: '%',
            selector: vacancy,
            action: createAction('Vacancy', setVacancy, setAnimateTriggers),            
            optional: rent
        },
        {
            label: 'CapEx',
            placeholder: '0.00',
            hint: 'Typically 5-15% of Monthly Rent',
            endContentSymbol: '%',
            selector: capEx,
            action: createAction('CapEx', setCapEx, setAnimateTriggers),            
            optional: rent
        },
        {
            label: 'Management Fees',
            placeholder: '0.00',
            hint: 'Typically 7-12% of Monthly Rent',
            endContentSymbol: '%',
            selector: mgmtFees,
            action: createAction('Management Fees', setMgmtFees, setAnimateTriggers),            
            optional: rent

        },
        {
            label: 'Electricity',
            placeholder: '0.00',
            hint: 'Monthly electricity cost',
            endContentSymbol: '$',
            selector: electricity,
            action: ((e) => dispatch(setElectricity(e.target.value)))
        },
        {
            label: 'Gas',
            placeholder: '0.00',
            hint: 'Monthly gas cost',
            endContentSymbol: '$',
            selector: gas,
            action: ((e) => dispatch(setGas(e.target.value)))
        },
        {
            label: 'Water',
            placeholder: '0.00',
            hint: 'Monthly water cost',
            endContentSymbol: '$',
            selector: water,
            action: ((e) => dispatch(setWater(e.target.value)))
        },
        {
            label: 'Garbage',
            placeholder: '0.00',
            hint: 'Monthly garbage collection fee',
            endContentSymbol: '$',
            selector: garbage,
            action: ((e) => dispatch(setGarbage(e.target.value)))
        },
        {
            label: 'HOA',
            placeholder: '0.00',
            hint: 'Monthly Homeowners Association fee',
            endContentSymbol: '$',
            selector: hoa,
            action: ((e) => dispatch(setHoa(e.target.value)))
        }
    ];

    



    const renderDivs = () => {
        return dataList.map(({ label, placeholder, hint, endContentSymbol, selector, action, optional }, index) => (
            <motion.div key={index} className="flex w-full justify-between items-start mb-4 hover:text-blue-600 hover:border-blue-600 transition-colors duration-150 ease-linear border-b border-gray-300 p-[1.1rem] py-4"
                whileHover={"hover"}>
                <div className="flex flex-col p-0 m-0 text-left">
                    <label className='p-0 m-0'>{label}</label>
                    <small className="text-sm text-gray-500 p-0 m-0">{hint}</small>
                </div>
                <div className='flex flex-col space-y-2 items-end'>
                    <Input
                        type="number"
                        placeholder={placeholder}
                        min={0}
                        labelPlacement="outside"
                        // Replace `yourDispatchFunction` and `yourValue` with actual dispatch function and value from your state
                        className='w-1/2'
                        value={selector}
                        onChange={action}
                        endContent={
                            <div className="pointer-events-none flex items-center">
                                <span className="text-default-400 text-small">{endContentSymbol}</span>
                            </div>
                        }
                    />
                    <motion.div initial={animateTriggers[label] ? "initial" : "exit"} animate={animateTriggers[label] ? "animate" : "exit"} exit="exit" variants={valueChange}>
                    {endContentSymbol === '%' && (
                        <span className=" text-default-500 text-xs ">
                            {((selector * optional) / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                            {/* {console.log('selector', ((100 * purchase_price) / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' }))} */}

                        </span>
                    )}
                    </motion.div>

                </div>
            </motion.div>
        ));
    };


    return (
        <div className='flex flex-col md:flex-row gap-4'>
            <div className="w-full md:w-1/2 bg-white p-4 rounded-xl">
                <div className="flex w-full flex-wrap gap-4">
                    <div className="flex w-full justify-between items-center mb-4 hover:text-blue-600 hover:border-blue-600 transition-colors duration-150 ease-linear border-b border-gray-300 p-[1.1rem] py-4">
                        <label>Addres</label>
                        <Input
                            className='w-3/4 text-black'
                            size='sm'
                            type="text"  // Changed from "email" to "text"
                            placeholder="Enter address"
                            value={address}
                            onChange={(e) => dispatch(setAddress(e.target.value))} />
                    </div>
                    <div className="flex w-full justify-between items-center mb-4 hover:text-blue-600 hover:border-blue-600 transition-colors duration-150 ease-linear border-b border-gray-300 p-[1.1rem] py-4">
                        <label>Purchase Price </label>
                        <Input
                            type="number"
                            placeholder="0.00"
                            min={0}
                            labelPlacement="outside"
                            endContent={
                                <div className="pointer-events-none flex items-center">
                                    <span className="text-default-400 text-small">$</span>
                                </div>
                            }
                            className='w-1/4'
                            value={purchase_price}
                            onChange={(e) => dispatch(setPurchasePrice(e.target.value))}
                        />
                    </div>
                    <div className="w-full flex justify-end">
                        <Button isLoading={isLoading} onClick={() => dispatch(getPropertyData(address))} color="primary" variant="solid">
                            Search
                        </Button>
                    </div>

                    <MortgageCalculation />

                    {renderDivs()}

                </div>

            </div>
            <div className="w-full md:w-1/2">
               <Results/>
            </div>
        </div>
    )
}

