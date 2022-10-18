import { PinkDiv } from "./App"
import { UserContext } from "./App"
import { useContext } from "react"
import './UserProfile.scss'
import profilePicture from './assets/blank-profile-picture-973460.svg'
import { Typography } from "@mui/material"


export const UserProfile = ()=>{
    const user = useContext(UserContext)
    return(
        <>
    <PinkDiv className="userProfile_pinkdiv">
        <img className="user_profile_pic" src={user.PhotoUrl || profilePicture}/>
        <Typography variant="h6" component='p'>{user.displayName}</Typography>
        
    
    </PinkDiv>
    <Typography variant="p" component='p'sx={{'padding' :'20px'}}>
    <Typography>Email Address</Typography>
    <Typography sx={{'color':'#808080'}}>{user.email}</Typography>
    </Typography>
    <Typography variant="p" component='p'sx={{'padding' :'20px'}}>
    <Typography>Username</Typography>
    <Typography sx={{'color':'#808080'}}>{user.displayName}</Typography>
    </Typography>
    <Typography variant="p" component='p'sx={{'padding' :'20px'}}>
    <Typography>Email Address</Typography>
    <Typography>{user.email}</Typography>
    </Typography>
</>
    )
}