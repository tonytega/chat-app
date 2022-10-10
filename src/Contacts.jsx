import profilePicture from './assets/blank-profile-picture-973460.svg'
import './Contact.css'
import { Link } from 'react-router-dom'
import { SelectedContact } from './SelectedContact'
import { useState,useContext } from 'react'
import { UserContext } from './App'

export const Contacts = ({userList})=>{
    const userData = useContext(UserContext)
    const [showSelectedContact , setShowSelectedContact] = useState(false)
    const [selectedContactData, setSelectedContactData ]= useState()
const selectContact = (user)=>{
    (showSelectedContact === false) && setShowSelectedContact(true);
    setSelectedContactData(user);
    
    console.log(userData)
}
{showSelectedContact && console.log(userData.uid.localeCompare( selectedContactData.uid ))}
    return (
        <>
        {(showSelectedContact === false) && <><p>Messages</p>
       <div>
            {
                userList.map((user)=>{
                    return(
                        <div className='other_user_div' key={user.uid} onClick={()=>{selectContact(user)}}>
                        <img className='profile_img' src={user.photoURL || profilePicture}/><p>{user.displayName}</p>

                        </div>
                    )
                })
            }
        </div></>}
        <div>
           {showSelectedContact && <SelectedContact selectedContactData={selectedContactData} 
            setShowSelectedContact={setShowSelectedContact} showSelectedContact={showSelectedContact}
           chatName={userData.uid.localeCompare(selectedContactData.uid) === 1 ? userData.uid : selectedContactData.uid}/>}
        </div>
        </>
    )
}