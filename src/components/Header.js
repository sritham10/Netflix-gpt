import React, { useEffect } from 'react'
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO, SUPPORTED_LANGUAGES,USER_AVATAR} from '../utils/constants';
import { toggleGptSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faSignOut } from '@fortawesome/free-solid-svg-icons'

const Header = () => {
  const dispatch =useDispatch();
  const navigate =useNavigate();
  const user = useSelector(store =>store.user);
  const showGptSearch = useSelector((store)=> store.gpt.showGptSearch);
  const handleSignOut =()=>{
    signOut(auth).then(() => {
    }).catch((error) => { 
      navigate("/error");
    });
  }
  useEffect(()=>{
    const unsubscribe=onAuthStateChanged(auth, (user) => {
      if (user) {
        
        const {uid,email,displayName,photoURL } = user;
        dispatch(
          addUser({
            uid:uid,
            email:email,
            displayName:displayName,
            photoURL:photoURL
          })
          );
          navigate("/browse");
      } else {
        
        dispatch(removeUser());
        navigate("/");
      }
    });

    return ()=> unsubscribe();
   },[])

 const  handleGptSearchClick=()=>{
    dispatch(toggleGptSearchView());       
   }

  const handleLanguageChange = (e) =>{
        dispatch(changeLanguage(e.target.value));
     };
  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
     <img 
     className="w-44"
     src= {LOGO}
         alt="LOGO"
         />
        {user && <div className='flex p-2'>
         { showGptSearch &&( <select className=' p-2 m-2 bg-gray-900 text-white' onChange = {handleLanguageChange}>
            {SUPPORTED_LANGUAGES.map(lang=>  <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>)}
          </select>)}
          <button className='py-1 px-2 m-2 mr-4 font-semibold rounded-md bg-green-400'
          onClick={handleGptSearchClick}>
            {showGptSearch? "Homepage" : "GPT Search"}<FontAwesomeIcon className="text-gray-800" icon={faHome} /></button>
          <img 
          className='w-10 h-12 hidden md:block ' alt="usericon"  src={user.photoUrl || USER_AVATAR} />
         <button onClick={handleSignOut} className='py-1 px-2 m-2 ml-4 mr-4 font-semibold rounded-md bg-red-700 text-white pl-2'><FontAwesomeIcon icon={faSignOut} /></button>
        </div>}
         </div>

  )
};

export default Header
