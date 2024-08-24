import { useState, useEffect } from 'react';
import { Loader } from "../layout/Loader/Loader";
import "./ResetPassword.css";
import { useNavigate, useParams } from "react-router-dom";
import { LockOpen, Lock,Visibility,VisibilityOff } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, ResetPasswordToken } from "../../Actions/userAction";
import { useAlert } from "react-alert";
import { Metadata } from "../layout/Metadata";

export function ResetPassword() {
    const dispatch = useDispatch();
    const alert = useAlert();
    
    const {error,success,loading} = useSelector(state=>state.forgetPassword)
    
    const [visible1,setVisible1] = useState(false);
    const [visible2,setVisible2] = useState(false);

    const {token} = useParams();
    const path = useNavigate();
    
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const resetPasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();
        myForm.set("password", password);
        myForm.set("confirmPassword", confirmPassword);

        dispatch(ResetPasswordToken(token,myForm));
    };

    useEffect(() => {
       
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (success) {
            alert.success("Password Changed Successfully !");
            path("/login");
            
        }
    }, [error, alert, dispatch, path, success]);
    return (
        <>
            {loading ? (<Loader />) : (
                <>
                    <Metadata title={"Change Password"} />
                    <div className='resetPasswordContainer'>
                        <div className='resetPasswordBox'>
                            <h2 className='resetPasswordHeading'>Update Profile</h2>
                            <form className='resetPasswordForm' encType='multipart/form-data' onSubmit={resetPasswordSubmit}>
                                
                                <div>
                                    <LockOpen className='mysvg' />
                                    {visible1 ? <VisibilityOff className='vicon' onClick={()=>setVisible1(!visible1)}/>:<Visibility className='vicon' onClick={()=>setVisible1(!visible1)}/>}

                                    <input
                                        required
                                        type={visible1 ? "text":"password"}
                                        placeholder='New Password'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <div className='loginPassword'>
                                    <Lock className='mysvg'/>
                                    {visible2 ? <VisibilityOff className='vicon' onClick={()=>setVisible2(!visible2)}/>:<Visibility className='vicon' onClick={()=>setVisible2(!visible2)}/>}

                                    <input
                                        required
                                        type={visible2 ? "text":"password"}
                                        placeholder='Confirm Password'
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)} />
                                </div>
                                <input
                                    type='submit'
                                    className='resetPasswordBtn'
                                    value={"Change"}
                                />
                            </form>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}
