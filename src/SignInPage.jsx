import './SignInPage.css'
import FormControl  from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import FormHelperText from "@mui/material/FormHelperText";
import { createTheme,ThemeProvider} from '@mui/material/styles';
import  Button  from "@mui/material/Button";
import { useState } from 'react';
import { database } from './firebase';
import { ref,push,child,update} from 'firebase/database'

const theme = createTheme(
    {
        palette : {
           primary : {
            main : '#ff2a6b'
           },
           secondary : {
            main :'#ff2a6b',
           },
           custom : {
            main : '#ff2a6b'
           },
          
    }
})



const SignInPage = ()=>{
    const [firstName,setFirstName] = useState(null);
    const [lastName,setLastName] = useState(null);
    const [email,setEmail] = useState(null);
    const [userName,setUserName] = useState(null);
    const [passWord,setPassWord] = useState(null);
    const [confirmPassWord,setConfirmPassWord] = useState(null);

    
const handleInputChange = (e)=>{
    const {id,value}=e.target;
    if (id === 'first-name'){
        setFirstName(value);
        console.log(value)
    }else if(id === 'last-name'){
        setLastName(value);
    }
    else if(id === 'email'){
        setEmail(value);
    }else if(id === 'username'){
        setUserName(value);
    }else if(id === 'password'){
        setPassWord(value);
        console.log(value)
    }
    }

 const handleConfirmPassWord = (e,passWord)=>{
    const {id,value}=e.target;
    // console.log(value);
    if(id === 'confirm-password' && value === passWord){
        setConfirmPassWord(value);
        // console.log(value);
 }
}
 const handleSubmit = ()=>{
    let obj = {
        firstName : firstName,
        lastName : lastName,
        email : email,
        userName : userName,
        passWord : passWord,
        confirmPassWord : confirmPassWord,
    }
    const newPostKey = push(child(ref(database),'posts')).key;
    const updates = {};
    updates ['/'+ newPostKey] = obj;
    return update(ref(database),updates);
    // console.log(firstName,lastName,email,userName,passWord,confirmPassWord)
 }
    return(
    <>
        <h1 color='primary'>Talk</h1>
        
        <form className='Sign-in-form'>
            <ThemeProvider theme={theme}>
                <div className='form-control'>
                <FormControl >
                    <InputLabel htmlFor="first-name" required >First Name</InputLabel>
                    <Input id="first-name"  color='custom' placeholder='firstname' onChange={(event)=>handleInputChange(event)}/>
                </FormControl>
                </div>
                <div className='form-control'>
                <FormControl >
                    <InputLabel htmlFor="last-name" required>Last Name</InputLabel>
                    <Input id="last-name" required  onChange={(event)=>handleInputChange(event)}/>
                </FormControl>
                </div>
                <div className='form-control'>
                <FormControl >
                    <InputLabel htmlFor="email" required>Email address</InputLabel>
                    <Input id="email" aria-describedby="my-helper-text"  onChange={(event)=>handleInputChange(event)}/>
                </FormControl>
                </div>
                <div className='form-control'>
                <FormControl >
                    <InputLabel htmlFor="username" required>username</InputLabel>
                    <Input id="username" onChange={(event)=>handleInputChange(event)}/>
                </FormControl>
                </div>
                <div className='form-control'>
                <FormControl >
                    <InputLabel htmlFor="password" required>Password</InputLabel>
                    <Input id="password" type='password'  onChange={(event)=>handleInputChange(event)}/>
                </FormControl>
                </div>
                <div className='form-control'>
                <FormControl >
                    <InputLabel htmlFor="confirm-password" required>Confirm Password</InputLabel>
                    <Input id="confirm-password" type='password' onChange={(event)=>handleConfirmPassWord(event,passWord)}/>
                </FormControl>
                </div>
                <div className='form-control'>
                <Button variant='contained' onClick={()=>handleSubmit()}>Primary</Button>
                </div>
            </ThemeProvider>     
        </form> 

       
    </>
)}

export default SignInPage;