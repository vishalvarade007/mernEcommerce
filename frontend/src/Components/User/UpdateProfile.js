import { useState, useEffect } from 'react';
import { Loader } from "../layout/Loader/Loader";
import "./UpdateProfile.css";
import { useNavigate } from "react-router-dom";
import { MailOutline, Face } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, loadUser, updateProfile } from "../../Actions/userAction";
import { useAlert } from "react-alert";
import profimg from "../../Images/prof.png";
import { UPDATE_PROFILE_RESET } from "../../Constants/userConstants";
import {Metadata} from "../layout/Metadata";



export function UpdateProfile() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const path = useNavigate();

  const { user } = useSelector((state) => state.user);
  const { loading, isUpdated, error } = useSelector((state) => state.profile);

  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState(profimg);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const updateProfileDataChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);

  };

  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);

    dispatch(updateProfile(myForm));
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Profile Updated Successfully !");
      dispatch(loadUser());
      path("/account");
      dispatch({ type: UPDATE_PROFILE_RESET });
    }
  }, [error, alert, dispatch, path, user, isUpdated]);
  return (
    <>
      {loading ? (<Loader />) : (
        <>
        <Metadata title={"Update Profile"}/>
          <div className='UpdateProfileContainer'>
            <div className='UpdateProfileBox'>
              <h2 className='UpdateProfileHeading'>Update Profile</h2>
              <form className='UpdateProfileForm' encType='multipart/form-data' onSubmit={updateProfileSubmit}>
                <div className='UpdateProfileName'>
                  <Face />
                  <input
                    type='text'
                    required
                    placeholder='Name'
                    name='name'
                    value={name}
                    onChange={(e)=>setName(e.target.value)} />
                    
                </div>
                <div className='UpdateProfileEmail'>
                  <MailOutline />
                  <input
                    type='email'
                    required
                    placeholder='Email'
                    name='email'
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}/>
                </div>

                <div id='updateProfileImage'>
                  <img src={avatarPreview} alt='Avatar Preview' />
                  <input
                    type='file'
                    name='avatar'
                    accept='image/'
                    onChange={updateProfileDataChange} />
                </div>
                <input
                  type='submit'
                  className='UpdateProfileBtn'
                  value={"Update"}
                />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  )
}


