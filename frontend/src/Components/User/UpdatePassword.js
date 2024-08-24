import { useState, useEffect } from 'react';
import { Loader } from "../layout/Loader/Loader";
import "./UpdatePassword.css";
import { useNavigate } from "react-router-dom";
import { LockOpen, VpnKey, Lock,Visibility,VisibilityOff } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updatePassword } from "../../Actions/userAction";
import { useAlert } from "react-alert";
import { UPDATE_PASSWORD_RESET } from "../../Constants/userConstants";
import { Metadata } from "../layout/Metadata";

export function UpdatePassword() {
    const dispatch = useDispatch();
    const alert = useAlert();
    const path = useNavigate();
    
    const [visible1,setVisible1] = useState(false);
    const [visible2,setVisible2] = useState(false);
    const [visible3,setVisible3] = useState(false);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const { loading, isUpdated, error } = useSelector((state) => state.profile);

    const updatePasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();
        myForm.set("oldPassword", oldPassword);
        myForm.set("newPassword", newPassword);
        myForm.set("confirmPassword", confirmPassword);

        dispatch(updatePassword(myForm));
    };

    useEffect(() => {
       
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            alert.success("Password Changed Successfully !");
            path("/account");
            dispatch({ type: UPDATE_PASSWORD_RESET });
        }
    }, [error, alert, dispatch, path, isUpdated]);
    return (
        <>
            {loading ? (<Loader />) : (
                <>
                    <Metadata title={"Change Password"} />
                    <div className='updatePasswordContainer'>
                        <div className='updatePasswordBox'>
                            <h2 className='updatePasswordHeading'>Change Password</h2>
                            <form className='updatePasswordForm' encType='multipart/form-data' onSubmit={updatePasswordSubmit}>
                                <div className='loginPassword'>
                                    <VpnKey  className='mysvg'/>
                                    {visible1 ? <VisibilityOff className='vicon' onClick={()=>setVisible1(!visible1)}/>:<Visibility className='vicon' onClick={()=>setVisible1(!visible1)}/>}
                                    <input
                                        required
                                        type={visible1 ? "text":"password"}
                                        placeholder='Old Password'
                                        value={oldPassword}
                                        onChange={(e) => setOldPassword(e.target.value)} />
                                        
                                </div>
                                <div className='loginPassword'>
                                    <LockOpen className='mysvg' />
                                    {visible2 ? <VisibilityOff className='vicon' onClick={()=>setVisible2(!visible2)}/>:<Visibility className='vicon' onClick={()=>setVisible2(!visible2)}/>}

                                    <input
                                        required
                                        type={visible2 ? "text":"password"}
                                        placeholder='New Password'
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)} />
                                </div>
                                <div className='loginPassword'>
                                    <Lock className='mysvg'/>
                                    {visible3 ? <VisibilityOff className='vicon' onClick={()=>setVisible3(!visible3)}/>:<Visibility className='vicon' onClick={()=>setVisible3(!visible3)}/>}

                                    <input
                                        required
                                        type={visible3 ? "text":"password"}
                                        placeholder='Confirm Password'
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)} />
                                </div>
                                <input
                                    type='submit'
                                    className='updatePasswordBtn'
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
