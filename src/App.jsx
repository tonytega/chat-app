import { useState } from 'react'
import './App.scss'
import SignInPage from './formComponents/SignInPage'
import { LoginPage } from './formComponents/loginPage'
import { HomePage } from './HomePage'
import  PubNub from 'pubnub'
import {PubNubProvider} from 'pubnub-react'
import { Routes, Route,Navigate } from 'react-router-dom';
import { useEffect,createContext } from 'react'
import { ThemeContext } from './context/themeContext'
import { createTheme,ThemeProvider } from '@mui/material'
import {styled} from '@mui/material/styles'


export const UserContext = createContext() 
export const MuiTheme = createContext();
const theme = createTheme(
  {
      palette : {
         primary : {
          main : '#ff2a6b'
         },
         secondary : {
          main :'#ffffff',
         },
         custom : {
          main : '#ff2a6b' 
         },     
  },
  color : {
    primary : '#ffffff'
  }
})

export const PinkDiv = styled('div')(({theme})=>({
          backgroundColor: theme.palette.primary.main,
          color : theme.color.primary,
}));

function App() {
  const [user,setUser] = useState(null)
  const [userCreated,setUsercreated] = useState(false);
  const [userList,setUserList] = useState([]);

  
  
  useEffect(
    ()=>{
      if (userCreated === true){
        fetch('https://attire-clam.cyclic.app/user').then((response)=>response.json()
                                                ).then((data)=>{setUserList(data)})
                                                .catch((error)=>{console.log(error)})
        
      }
    },[userCreated]
  )
  // #ff2a6b

  const pubnub = new PubNub({
      publishKey: import.meta.env.VITE_PUB_KEY,
      subscribeKey: import.meta.env.VITE_SUB_KEY,
      uuid: user ? `${user.uid}` : 'defailt_uuid',})
      // uuid: 'defailt_uuid'})

  return (
    <MuiTheme.Provider value={theme}>
    <ThemeContext.Provider value={theme}>
      <ThemeProvider theme={theme}>
    <PubNubProvider client={pubnub}> 
    <UserContext.Provider value = {user} >
    <>
       <div className="App">
    <Routes>
        <Route path='/' element={userCreated ?<HomePage userList={userList}/> : <Navigate to='/signin'/>}/>
        <Route path='/signin' element = { userCreated ? <Navigate to='/'/> :<SignInPage setUsercreated={setUsercreated} setUser={setUser}/>
                                         } />
        <Route path='/login' element={userCreated ? <Navigate to='/'/> :<LoginPage setUser={setUser} setUsercreated={setUsercreated}/>}/>
       </Routes>
    </div>
    </>
    </UserContext.Provider>
    </PubNubProvider>
    </ThemeProvider>
    </ThemeContext.Provider>
    </MuiTheme.Provider>
  )
}

export default App;
