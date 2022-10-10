import { useState } from 'react'
import './App.css'
import SignInPage from './formComponents/SignInPage'
import { LoginPage } from './formComponents/loginPage'
import { HomePage } from './HomePage'
import  PubNub from 'pubnub'
import {PubNubProvider} from 'pubnub-react'
// import { database,auth} from '../../chat_server/firebase';
import { Routes, Route,Navigate } from 'react-router-dom';
import { useEffect,createContext } from 'react'
import { getAuth } from 'firebase/auth'

export const UserContext = createContext() 

function App() {
  const [user,setUser] = useState(null)
  const [userCreated,setUsercreated] = useState(false);
  const [userList,setUserList] = useState([]);

  
  
  useEffect(
    ()=>{
      if (userCreated === true){
        fetch('http://localhost:8080/user').then((response)=>response.json()
                                                ).then((data)=>{setUserList(data)})
                                                .catch((error)=>{console.log(error)})
        
      }
    },[userCreated]
  )

  const pubnub = new PubNub({
      publishKey: import.meta.env.VITE_PUB_KEY,
      subscribeKey: import.meta.env.VITE_SUB_KEY,
      uuid: user ? `${user.uid}` : 'defailt_uuid',})
      // uuid: 'defailt_uuid'})

  return (
   <PubNubProvider client={pubnub}> 
   <UserContext.Provider value = {user} >
    <>
       <div className="App">
    <Routes>
        <Route path='/' element={userCreated ?<HomePage userList={userList}/> : <Navigate to='/signin'/>}/>
        <Route path='/signin' element = { userCreated ? <Navigate to='/'/> : <SignInPage setUsercreated={setUsercreated} setUser={setUser}/>
                                         } />
        <Route path='/login' element={userCreated ? <Navigate to='/'/> :<LoginPage setUser={setUser} setUsercreated={setUsercreated}/>}/>
       </Routes>
    </div>
    </>
    </UserContext.Provider>
    </PubNubProvider>
  )
}

export default App;
