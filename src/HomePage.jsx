import './HomePage.scss'
import { Chat, MessageList, MessageInput } from "@pubnub/react-chat-components";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMessage,faUser} from '@fortawesome/free-regular-svg-icons'
import {faUsers} from '@fortawesome/free-solid-svg-icons'
import { Contacts } from "./Contacts";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Groups } from "./Groups";
import {UserProfile} from './UserProfile'
import { PinkDiv } from './App';


export const HomePage = ({user,userList})=>{
   const [showMessage, setShowMessage] = useState(true);
   const [showUsers, setShowUsers] = useState(false);
   const [showUserProfile, setShowUserProfile] = useState(false);

   const onShowMessage = ()=>{
        setShowMessage(true);
        setShowUsers(false);
        setShowUserProfile(false);
   }
   const onShowUsers = ()=>{
        setShowMessage(false);
        setShowUserProfile(false);
        setShowUsers(true);
        
   }
   const onShowUserProfile = ()=>{
        setShowMessage(false);
        setShowUsers(false);
        setShowUserProfile(true);
   }
    return(
    <div className='homepage'> 
        {showMessage && <Contacts userList={userList}/>}
        {showUsers && <Groups/>}
        {showUserProfile && <UserProfile/>}
    <div className="footer">
         <FontAwesomeIcon className='footer_icons' icon={faMessage} color={showMessage ? '#ff2a6b': 'black'} size={'2x'} onClick={onShowMessage}/>
         <FontAwesomeIcon className='footer_icons' icon={faUsers} color={showUsers ? '#ff2a6b': 'black'} size={'2x'}  onClick={onShowUsers}/>
         <FontAwesomeIcon className='footer_icons' icon={faUser} color={showUserProfile ? '#ff2a6b': 'black'} size={'2x'} onClick={onShowUserProfile} />
    </div>
        
    </div> )
}