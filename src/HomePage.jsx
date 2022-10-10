import { Chat, MessageList, MessageInput } from "@pubnub/react-chat-components";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMessage,faUser} from '@fortawesome/free-regular-svg-icons'
import {faUsers} from '@fortawesome/free-solid-svg-icons'
import { Contacts } from "./Contacts";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Groups } from "./Groups";
import {UserProfile} from './UserProfile'


export const HomePage = ({user,userList})=>{
   const [showMessage, setShowMessage] = useState(true);
   const [showUsers, setShowUsers] = useState(false);
   const [showUserProfile, setShowUserProfile] = useState(false);

   const onShowMessage = ()=>{
        setShowMessage(true);
        setShowUsers(false);
        setShowUsers(false);
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
    <div> 
        {showMessage && <Contacts userList={userList}/>}
        {showUsers && <Groups/>}
        {showUserProfile && <UserProfile/>}
    <div>
         <FontAwesomeIcon icon={faMessage} onClick={onShowMessage}/>
         <FontAwesomeIcon icon={faUsers} onClick={onShowUsers}/>
         <FontAwesomeIcon icon={faUser} onClick={onShowUserProfile} />
    </div>
        
    </div> )
}