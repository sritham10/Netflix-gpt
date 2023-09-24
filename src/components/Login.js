import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValidData } from '../utils/validate';
import {  createUserWithEmailAndPassword,signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { BG_URL, USER_AVATAR } from '../utils/constants';

const Login = () => {
  const[isSignInform,setIsSignIform]=useState(true);
   const[errorMessage,setErrorMessage]=useState(null);

   const dispatch =useDispatch();

   
   const name=useRef(null);
    const email =useRef(null);
    const password =useRef(null);

  const handleButtonClick =()=>{
    //validate the form data
    // checkValidData(email,password)
    const message=checkValidData(email.current.value,password.current.value);
    setErrorMessage(message);
   if(message) return;

    if(!isSignInform){
            //sign up logic
            createUserWithEmailAndPassword(auth,
               email.current.value,
                password.current.value
                )
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    updateProfile(user, {
      displayName: name.current.value, photoURL: USER_AVATAR,
    }).then(() => {
      const {uid,email,displayName,photoURL } = auth.currentUser
      ;
      dispatch(addUser({uid:uid,email:email,displayName:displayName,photoURL:photoURL}));
    }).catch((error) => {
      setErrorMessage(error.message); 
         
    });
   
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode+"-"+errorMessage)
    // ..
  });

    }
    else{
      //sign in logic
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
    
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode+"-"+errorMessage);
      });

    }
  }
    
   
 const toggleSignInForm = () =>{

      setIsSignIform(!isSignInform);
 }


  return (
    <div>
      <Header></Header>
      <div className="absolute">
      <img src={BG_URL}
      alt="logo"
      />
      </div>
      <form onSubmit={(e)=>e.preventDefault( )} 
     className="w-3/12 absolute   p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80">
     <h1 className="font-bold text-3xl py-4">{isSignInform ?"Sign In" : "Sign up"}</h1>
     {!isSignInform &&( <input
     ref={name}
      type="text" 
      placeholder="Full Name"
       className="p-4 my-4 w-full bg-gray-600"/>)}
      <input 
      ref={email}
      type="text"
       placeholder="Email Address" 
       className="p-4 my-4 w-full bg-gray-600"
       />
      <input
      ref={password}
       type="Password" 
      placeholder="Password"
       className="p-4 my-4 w-full bg-gray-600"
       />
       <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>
      <button 
      className="p-4 my-6 bg-red-700 w-full rounded-lg" onClick={handleButtonClick}>
        {isSignInform ?"Sign In" : "Sign up"}
      </button>
      <p className="py-4 cursor-pointer"
      onClick={toggleSignInForm}>{isSignInform ?"New to Netflix? Sign Up Now":"Already registered?SIgn In Now" }</p>
     </form>
    </div>
  );                                                                                                                                                                                                                                                                                                                                
};

export default Login;