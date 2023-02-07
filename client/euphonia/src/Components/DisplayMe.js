import {useEffect, useState} from 'react'
export default function DisplayMe({ accessToken, spotifyApi }){
    const [userDetails, setUserDetails] = useState({})

    useEffect(() => {
        if (!accessToken) return
        spotifyApi.setAccessToken(accessToken)
        spotifyApi.getMe().then(res=>{
            console.log(res)
            const {display_name, email, country} = res.body
            setUserDetails({name:display_name, email:email, country:country})
            console.log(userDetails)
        }).catch(error=>{
            console.log(error.message)
        })
    }, [accessToken])
    return(
        <div className='userInfo'>
            <h5 className='username'>Logged In as: {userDetails.name}</h5>
            <p className='userEmail'>{userDetails.email}</p>
        </div>
    )

}