import './SelctedContact.scss'
import { Chat, MessageList, MessageInput } from "@pubnub/react-chat-components";
import {styled} from '@mui/system'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowAltCircleLeft} from '@fortawesome/free-regular-svg-icons'
import { UserContext,MuiTheme } from "./App";
import { useContext } from "react";
import { PinkDiv } from './App';



export const SelectedContact = ({selectedContactData,chatName,setShowSelectedContact,showSelectedContact})=>{
    const userData = useContext(UserContext)
    const muiTheme = useContext(MuiTheme)

    const ChatHeader= styled('div')(()=>{
        // backgroundColor: 
    })
    
    const myUser = {
        id: userData.uid,
        name: userData.displayName,
        profileUrl: userData.PhotoURL,
      };
    // console.log(userData)
    const cancelSelectContact = ()=>{
        (showSelectedContact === true) && setShowSelectedContact(false);
    }
    return(
        <div className="selected_contact" >
            <PinkDiv>
                <div className='chat_header'>
                <FontAwesomeIcon icon={faArrowAltCircleLeft} size={'2xl'}onClick={cancelSelectContact} />
                <h1 className='chat_username'>{selectedContactData.displayName}</h1>
                </div>
            </PinkDiv>
    <Chat currentChannel={chatName} users={[myUser]}>
        <MessageList fetchMessages={10}/> 
        <MessageInput className='message_input' senderInfo={true} />   
    </Chat>
        </div>
    )
}