import './SignInPage.css'
import FormControl  from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import FormHelperText from "@mui/material/FormHelperText";

import  Button  from "@mui/material/Button";
import { useState } from 'react';
import { database,auth } from '../firebase';
import { ref,push,child,update, set} from 'firebase/database'
import { createUserWithEmailAndPassword,updateProfile } from 'firebase/auth';
import { useEffect } from 'react';
import {genSaltSync,hashSync} from 'bcryptjs'
import {Link} from 'react-router-dom'



const SignInPage = ({setUsercreated,setUser})=>{
    // console.log(hello)
    const [email,setEmail] = useState(null);
    const [userName,setUserName] = useState(null);
    const [passWord,setPassWord] = useState(null);
    const [confirmPassWord,setConfirmPassWord] = useState(null);
    const [buttonDisabled,setButtonDisabled] = useState(true);
    const [isLoadingSignIn,setIsLoadingSignIn] = useState(false);

//  const onSetUser= (data)=>{
//         setUser(data)
//   }  
    
 useEffect(
    ()=>{
         
        if( email === null || userName === null || passWord === null || confirmPassWord === null ){
            setButtonDisabled(true);
        }else{setButtonDisabled(false);}
    },
    [email,userName,passWord,confirmPassWord]
 )

useEffect(
    ()=>{
        if (isLoadingSignIn){
        createUserWithEmailAndPassword(auth,email,passWord).then(
            (response)=>{
                    updateProfile(response.user,{displayName: `${userName}`})
                    .then(()=>{setUser(auth.currentUser);setUsercreated(true);});
                           
            }
        ).catch( setIsLoadingSignIn(false))
        }
    },
    [isLoadingSignIn]
)

const handleInputChange = (e)=>{
    const {id,value}=e.target;
   
    if(id === 'email' ){
        if(value.includes('com')&& value.includes('@') && value.includes('.')){
            setEmail(value);
        }else{
            setEmail(null);
        }
    }else if(id === 'username'){
        if(value.length < 8){
            setUserName(null)
        }else{
         setUserName(value);
        }
    }else if(id === 'password'){
        if(value.length < 8){
            setPassWord(null);
        }else{
        setPassWord(value);
        } 
    }
    }

 const handleConfirmPassWord = (e)=>{
    const {id,value}=e.target;
    if(id === 'confirm-password' && value === passWord){
        const salt = genSaltSync(10);
        const hello = hashSync(value,salt);
        setConfirmPassWord(hello);
    }else{
        setConfirmPassWord(null);
    }
}
 const handleSubmit = ()=>{
    setIsLoadingSignIn(true);
 }
    return(
    <>
        <h1 color='primary'>Talk</h1>
        <form className='Sign-in-form'>
                <div className='form-control'>
                <FormControl >
                    <InputLabel htmlFor="email" required>Email address</InputLabel>
                    <Input id="email" aria-describedby="my-helper-text"  onChange={(event)=>handleInputChange(event)}
                    inputProps={{maxLength: 50}}/>
                </FormControl>
                </div>
                <div className='form-control'>
                <FormControl >
                    <InputLabel htmlFor="username" required>username</InputLabel>
                    <Input id="username" onChange={(event)=>handleInputChange(event)} inputProps={{maxLength: 20}}/>
                </FormControl>
                </div>
                <div className='form-control'>
                <FormControl >
                    <InputLabel htmlFor="password" required>Password</InputLabel>
                    <Input id="password" type='password'  onChange={(event)=>handleInputChange(event)} inputProps={{maxLength: 50}}/>
                </FormControl>
                </div>
                <div className='form-control'>
                <FormControl >
                    <InputLabel htmlFor="confirm-password" required>Confirm Password</InputLabel>
                    <Input id="confirm-password" type='password' onChange={(event)=>handleConfirmPassWord(event,passWord)}inputProps={{maxLength: 50}}/>
                </FormControl>
                </div>
                <div className='form-control'>
                {isLoadingSignIn? <p color='custom'>Loading</p> : <Button variant='contained' onClick={()=>handleSubmit()} disabled = {buttonDisabled}>Primary</Button>}
                </div>
        </form> 
        <p>already have an account? <Link to='/login'>log in</Link></p>

       
    </>
)}

export default SignInPage;