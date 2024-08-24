import React from 'react';
import "./Contact.css";
import {Button} from "@mui/material";
import {Metadata} from "./Metadata";

export function Contact() {
  return (
    <>
    <Metadata title={"Contact"}/>
     <div className='contactContainer'>
      <a className='mailBtn' href='mailto:varadevishal07@gmail.com'>
        <Button>Contact: varadevishal07@gmail.com</Button>
      </a>
    </div>
    </>
  )
}
