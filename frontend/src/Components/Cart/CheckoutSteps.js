import { Typography, Stepper, StepLabel,Step} from '@mui/material';
import React from 'react';
import {LocalShipping,LibraryAddCheck,AccountBalance} from "@mui/icons-material";
import "./CheckoutSteps.css";

export function CheckoutSteps({activeStep}) {
    const steps = [
        {
            label:<Typography>Shipping Details</Typography>,
            icon:<LocalShipping/>
        },
        {
            label:<Typography>Confirm Order</Typography>,
            icon:<LibraryAddCheck/>
        },
        {
            label:<Typography>Payment</Typography>,
            icon:<AccountBalance/>
        },
    ];
    const stepStyles = {
        boxSizing:"border-box"
    }
  return (
    <>
      <Stepper alternativeLabel activeStep={activeStep} style={stepStyles} className='myStepper'>
         {steps.map((item,index)=>(
            <Step key={index} active={activeStep === index ? true:false} completed={activeStep >= index?true:false}>
               <StepLabel icon={item.icon} style={{color:activeStep >= index ? "tomato":"rgba(0,0,0,0.649)"}}>
                  {item.label}
               </StepLabel>
            </Step>
         ))}
      </Stepper>
    </>
  )
}
