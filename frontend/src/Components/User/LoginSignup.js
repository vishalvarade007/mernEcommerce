import React,{useRef,useState,useEffect} from 'react';
import "./LoginSignup.css";
import {Loader} from "../layout/Loader/Loader";
import {MailOutline,LockOpen, Face,Visibility,VisibilityOff} from "@mui/icons-material";
import {Link, useNavigate,useLocation} from "react-router-dom";
import profimg from "../../Images/prof.png";
import {login,clearErrors,register} from "../../Actions/userAction";
import {useDispatch,useSelector} from "react-redux";
import {useAlert} from "react-alert";
import {Metadata} from "../layout/Metadata";


export const LoginSignup = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const path = useNavigate();
    const location = useLocation();

    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const switcherTab = useRef(null);

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const [user,setUser] = useState({
       name:"",
       email:"",
       password:"",
    });
    
    const [visible,setVisible] = useState(false);
    const [visible2,setVisible2] = useState(false);
    const {name, email, password} = user;
    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState(profimg);
    
    const {loading, error, isAuthenticated} = useSelector((state)=>state.user);

    const myredirect = location.search ? location.search.split("=")[1] : "/account";
    

    useEffect(()=>{
       if(error){
          alert.error(error);
          dispatch(clearErrors());
       }
       if(isAuthenticated){
          path(myredirect);
       }
    },[error,alert,dispatch,isAuthenticated,path,myredirect]);

    const switchTabs = (e,tab)=>{
        if(tab === "login"){
            switcherTab.current.classList.add("shiftToNeutral");
            switcherTab.current.classList.remove("shiftToRight");

            registerTab.current.classList.remove("shiftToNeutralForm");
            loginTab.current.classList.remove("shiftToLeft");
        }
        if(tab === "register"){
            switcherTab.current.classList.add("shiftToRight");
            switcherTab.current.classList.remove("shiftToNeutral");

            registerTab.current.classList.add("shiftToNeutralForm");
            loginTab.current.classList.add("shiftToLeft");
        }
    };

    const loginSubmit = (e)=>{
        e.preventDefault();
        dispatch(login(loginEmail,loginPassword));
        
    }

    const registerDataChange = (e)=>{
        if(e.target.name === "avatar"){
            const reader = new FileReader();
            reader.onload = ()=>{
              if(reader.readyState === 2){
                setAvatarPreview(reader.result);
                setAvatar(reader.result);
              }
            };
            reader.readAsDataURL(e.target.files[0]);
        }else {
          setUser({...user,[e.target.name]:e.target.value});
        }
    }

    const registerSubmit = (e)=>{
       e.preventDefault();

       const myForm = new FormData();
       myForm.set("name",name);
       myForm.set("email",email);
       myForm.set("password",password);
       myForm.set("avatar",avatar);

      dispatch(register(myForm));
     
    }
    

  return (
    <>
      {loading ? <Loader/>:(
        <>
        <Metadata title={"Login/Register"}/>
        <div className='LoginSignupContainer'>
        <div className='LoginSignupBox'>
            <div>
                <div className='login_signup_toggle'>
                    <p onClick={(e)=>switchTabs(e,"login")}>LOGIN</p>
                    <p onClick={(e)=>switchTabs(e,"register")}>REGISTER</p>
                </div>
                <button ref={switcherTab}></button>
            </div>
            <form className='loginForm' ref={loginTab} onSubmit={loginSubmit}>
              <div className='loginEmail'>
                 <MailOutline/>
                 <input
                   required
                   type='email'
                   placeholder='Email'
                   value={loginEmail}
                   onChange={(e)=>setLoginEmail(e.target.value)}/>
              </div>
              <div className='loginPassword'>
                <LockOpen/>
                {visible? <VisibilityOff className='vicon' onClick={()=>setVisible(!visible)}/>:<Visibility className='vicon' onClick={()=>setVisible(!visible)}/>}

                <input
                   required
                   type={visible ? "text":"password" }
                   placeholder='Password'
                   value={loginPassword}
                   onChange={(e)=>setLoginPassword(e.target.value)}/>
              </div>
              <Link to="/password/forget">Forget Password ?</Link>
              <input type='submit' value="Login" className='loginBtn'/>
            </form>
            <form className='signupForm' ref={registerTab} encType='multipart/form-data' onSubmit={registerSubmit}>
               <div className='signupName'>
                 <Face/>
                 <input
                  type='text'
                  required
                  placeholder='Name'
                  name='name'
                  value={name}
                  onChange={registerDataChange}/>
               </div>
               <div className='signupEmail'>
                 <MailOutline/>
                 <input
                  type='email'
                  required
                  placeholder='Email'
                  name='email'
                  value={email}
                  onChange={registerDataChange}/>
               </div>
               <div className='signupPassword'>
                 <LockOpen/>
                 <input
                  type={visible2 ? "text":"password" }
                  required
                  placeholder='Password'
                  name='password'
                  value={password}
                  onChange={registerDataChange}/>
                   {visible2? <VisibilityOff className='vicon' onClick={()=>setVisible2(!visible2)}/>:<Visibility className='vicon' onClick={()=>setVisible2(!visible2)}/>}

               </div>
               
               <div id='registerImage'>
                 <img src={avatarPreview} alt='Avatar Preview'/>
                 <input
                  type='file'
                  name='avatar'
                  accept='image/'
                  onChange={registerDataChange}/>
               </div>
               <input
                type='submit'
                className='signupBtn'
                value={"Register"}
                />
            </form>
        </div>
      </div> 
        </>
      )}  
    </>
  )
}


