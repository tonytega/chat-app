import './loginPage.scss'
import {sizing} from '@mui/system'

import FormControl  from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';



export const LoginPage = ({setUser,setUsercreated})=>{
    const [email,setEmail] = useState(null);
    const [passWord,setPassWord] = useState(null);
    const [buttonDisabled,setButtonDisabled] = useState(true);
    const [isLoadingSignIn,setIsLoadingSignIn] = useState(false);

    
    useEffect(
        ()=>{   
             
            if( email === null && passWord === null ){
                setButtonDisabled(true);
            }else{setButtonDisabled(false);}
        },
        [email,passWord]
     )
    
     useEffect(
        ()=>{
            if (isLoadingSignIn){
               signInWithEmailAndPassword(auth,email,passWord).then(
                (response)=>{
                        setUser(response.user);
                        setUsercreated(true);
                               
                }
            ).catch( ()=>{setIsLoadingSignIn(false);setUsercreated(false)})
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
        }else if(id === 'password'){
            if(value.length < 8){
                setPassWord(null);
            }else{
            setPassWord(value);
            } 
        }
        }

    const handleSubmit = ()=>{
        setIsLoadingSignIn(true);
        }


 return(
    <>
        <h1 className='form_header'>Talk</h1>
    <form className='log-in-form'>
        <div className='form-control'>
            <FormControl sx={{width: '70%'}}>
                <InputLabel htmlFor="email" required>email</InputLabel>
                <Input id="email" type="email" color="custom" onChange={(event)=>handleInputChange(event)} 
                inputProps={{maxLength: 20}} fullWidth={true} sx={{width: '100%'}}/>
            </FormControl>
            </div>
            <div className='form-control'>
            <FormControl sx={{width: '70%'}}>
                <InputLabel htmlFor="password" required>Password</InputLabel>
                <Input id="password" type='password'  onChange={(event)=>handleInputChange(event)} 
                        sx={{width: '100%'}}    inputProps={{maxLength: 50}}/>
            </FormControl>
            </div>
            <div className='login_button'>
            <Button variant='contained' onClick={()=>handleSubmit()} disabled = {buttonDisabled}>Submit</Button>
            </div>
    </form>
    <p className='switch'>Do not have an account? <Link to='/'>sign in</Link></p>
    </>
 )
}