import React, { useContext, useEffect, useState } from 'react'
import { AiFillHeart } from 'react-icons/ai'
import useAuthCheck from '../../hooks/useAuthCheck'
import { useMutation } from 'react-query'
import { useAuth0 } from '@auth0/auth0-react'
import UserDetailContext from '../../Context/UserDetailsContext'
import { checkFavorites, updateFavorites } from '../../utils/common'
import { toFav } from '../../utils/api'

function Heart({id}) {

    const [heartColor,setHeartColor]=useState("white")
    const {validateLogin}=useAuthCheck()
    const {user} =useAuth0()
    const {userDetails, setUserDetails}=useContext(UserDetailContext);

    useEffect(()=>{
        setHeartColor(()=>checkFavorites(id,userDetails?.favorites))
    },[userDetails?.favorites])


    const {mutate}=useMutation({
        mutationFn:()=>toFav(id,user?.email,userDetails?.token),
        onSuccess:()=>{
            setUserDetails((prev)=>({
                ...prev,
                favorites:updateFavorites(id,prev.favorites)
            }))
        }
    })
    const handleLike=()=>{

        if(validateLogin()){
            mutate()
            setHeartColor((prev)=>prev==="#fa3e5f" ? "white":"#fa3e5f")
        }
    }

  return (
    <AiFillHeart size={24} color={heartColor} onClick={(e)=>{
        e.stopPropagation()
        handleLike();
    }} />
  )
}

export default Heart