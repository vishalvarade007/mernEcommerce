import { useState, useEffect } from 'react';
import { Loader } from "../layout/Loader/Loader";
import "./forgetPassword.css";
import { MailOutline} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors,forgetPassword } from "../../Actions/userAction";
import { useAlert } from "react-alert";
import {Metadata} from "../layout/Metadata";



export function ForgetPassword() {
  const dispatch = useDispatch();
  const alert = useAlert();
  
  const { loading, message, error } = useSelector((state) => state.forgetPassword);

  const [email, setEmail] = useState("");

  const forgetPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("email", email);

    dispatch(forgetPassword(myForm));
  };

  
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if(message){
        alert.success(message);
    }

  }, [error, alert, dispatch,message ]);

  return (
    <>
      {loading ? (<Loader />) : (
        <>
        <Metadata title={"Forget Password"}/>
          <div className='forgetPasswordContainer'>
            <div className='forgetPasswordBox'>
              <h2 className='forgetPasswordHeading'>Forget Password ??</h2>
              <form className='forgetPasswordForm'  onSubmit={forgetPasswordSubmit}>
                
                  
                <div className='forgetPasswordEmail'>
                  <MailOutline />
                  <input
                    type='email'
                    required
                    placeholder='Email'
                    name='email'
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}/>
                </div>

                
                <input
                  type='submit'
                  className='forgetPasswordBtn'
                  value={"Send"}
                />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  )
}



