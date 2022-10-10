import { Chat, MessageList, MessageInput } from "@pubnub/react-chat-components";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faXmarkCircle} from '@fortawesome/free-regular-svg-icons'
export const SelectedContact = ({SelectedContactData,chatName,setShowSelectedContact,showSelectedContact})=>{
    const cancelSelectContact = ()=>{
        (showSelectedContact === true) && setShowSelectedContact(false);
    }
    return(
        <div>
            <FontAwesomeIcon icon={faXmarkCircle} onClick={cancelSelectContact} />
             <Chat currentChannel={chatName} >
        <MessageList fetchMessages={10}/> 
        <MessageInput/>   
    </Chat>
        </div>
    )
}