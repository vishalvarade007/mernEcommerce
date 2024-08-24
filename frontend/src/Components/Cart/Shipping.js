import React,{useState} from 'react';
import "./Shipping.css";
import {Metadata} from "../layout/Metadata.js";
import {useDispatch,useSelector} from "react-redux";
import {saveShippingInfo} from "../../Actions/cartAction.js";
import {PinDrop,Home,LocationCity,Public,Phone,TransferWithinAStation} from "@mui/icons-material";
import {Country,State} from "country-state-city";
import {useAlert} from "react-alert";
import {CheckoutSteps} from "../Cart/CheckoutSteps.js";
import {useNavigate} from "react-router-dom";

export function Shipping() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const path = useNavigate();

  const {shippingInfo} = useSelector((state)=>state.cart);
  const [address,setAddress] = useState(shippingInfo.address);
  const [city,setCity] = useState(shippingInfo.city);
  const [state,setState] = useState(shippingInfo.state);
  const [country,setCountry] = useState(shippingInfo.country);
  const [pinCode,setPinCode] = useState(shippingInfo.pinCode);
  const [phoneNo,setPhoneNo] = useState(shippingInfo.phoneNo);
  
  const shippingSubmit = (e)=>{
     e.preventDefault();
     if(phoneNo.length < 10 || phoneNo.length > 10){
        alert.error("Phone Number should be of 10 digits!");
        return;
     }
     dispatch(saveShippingInfo({address,city,state,country,pinCode,phoneNo}));
     path("/order/confirm");
  };

  return (
    <> 
      <Metadata title={"Shipping Details"}/>
      <CheckoutSteps activeStep={0}/>
        <div className='shippingContainer'>
           <div className='shippingBox'>
              <h2 className='shippingHeading'>Shipping Details</h2>
              <form className='shippingForm' encType='multipart/form data' onSubmit={shippingSubmit}>
                <div>
                   <Home/>
                   <input
                     type='text'
                     placeholder='Address'
                     required
                     value={address}
                     onChange={(e)=>setAddress(e.target.value)}/>
                </div>
                <div>
                   <LocationCity/>
                   <input
                     type='text'
                     placeholder='City'
                     required
                     value={city}
                     onChange={(e)=>setCity(e.target.value)}/>
                </div>
                <div>
                   <PinDrop/>
                   <input
                     type='number'
                     placeholder='Pin Code'
                     required
                     value={pinCode}
                     onChange={(e)=>setPinCode(e.target.value)}/>
                </div>
                <div>
                   <Phone/>
                   <input
                     type='number'
                     placeholder='Phone No'
                     required
                     value={phoneNo}
                     size={"10"}
                     onChange={(e)=>setPhoneNo(e.target.value)}/>
                </div>
                <div>
                   <Public/>
                   <select 
                   value={country} 
                   required 
                   onChange={(e)=>setCountry(e.target.value)}>
                     <option value={""}>Country</option>
                     {Country.getAllCountries().map((item)=>(
                         <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
                     ))}
                   </select>
                </div>
                {country && (
                  <div>
                     <TransferWithinAStation/>
                      <select required value={state} onChange={(e)=>setState(e.target.value)}>
                         <option value={""}>State</option>
                         {State && 
                           State.getStatesOfCountry(country).map((item)=>(
                            <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
                           ))}
                      </select>
                  </div>
                )}
                <input
                 type='submit'
                 value="Continue"
                 className='shippingBtn'
                 disabled={state ? false:true}/>
              </form>
           </div>
        </div>
    </>
  )
}
