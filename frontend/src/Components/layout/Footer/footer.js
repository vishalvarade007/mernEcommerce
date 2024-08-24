import React from 'react';
import "./footer.css";
import {Facebook,Instagram,YouTube,Twitter} from "@mui/icons-material";

export function Footer() {
  return (
    <footer id='footer'>
      <div className='mycontainer'>
      <div className='footer-row'>
      <div className='footer-col'>
        <h4 style={{color:"red"}}>EasyCART</h4>
        <ul>
        <li><a href="#footer">About Us</a></li>
        <li><a href="#footer">Our Services</a></li>
        <li><a href="#footer">Privacy Plocies</a></li>
        </ul>
      </div>
      <div className='footer-col'>
        <h4>Get Help</h4>
        <ul>
        <li><a href="#footer">Contact Us</a></li>
        <li><a href="#footer">Refund Policies</a></li>
        <li><a href="#footer">Order Status</a></li>
        <li><a href="#footer">Shipping Policies</a></li>
        </ul>
      </div>
      <div className='footer-col'>
        <h4>Online Shop</h4>
        <ul>
        <li><a href="#footer">Clothes</a></li>
        <li><a href="#footer">Home essentials</a></li>
        <li><a href="#footer">Exercise products</a></li>
        <li><a href="#footer">Technology</a></li>
        </ul>
      </div>
      <div className='footer-col'>
         <h4>Follow Us</h4>
         <div className='social-links'>
          <a href="#footer"><Facebook/></a>
          <a href="#footer"><Instagram/></a>
          <a href="#footer"><YouTube/></a>
          <a href="#footer"><Twitter/></a>
         </div>
      </div>
      </div>
      </div>
    </footer>
  )
}


