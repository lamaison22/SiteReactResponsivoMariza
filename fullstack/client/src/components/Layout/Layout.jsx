import React, { useContext, useEffect } from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import {Outlet} from "react-router-dom"
import { useAuth0 } from '@auth0/auth0-react'
import UserDetailContext from '../../Context/UserDetailsContext'
import { useMutation } from 'react-query'
import { createUser } from '../../utils/api'
import useFavorites from '../../hooks/useFavorites'
import useBookings from '../../hooks/useBookings'

export default function Layout() {

  useFavorites()
  useBookings()
  const {isAuthenticated, user, getAccessTokenWithPopup}=useAuth0()
  const {setUserDetails}=useContext(UserDetailContext)
  const {mutate}=useMutation({
    mutationKey:[user?.email],
    mutationFn:(token)=>createUser(user?.email,token)
  })
   

  useEffect(()=>{
   
    const getTokenAndRegister = async () =>{
      const res = await getAccessTokenWithPopup({
        authorizationParams:{
          audience:"https://dev-vo4123tdnp7bcuws.us.auth0.com/api/v2/",
          scope:"openid profile user"
        }
      })
      localStorage.setItem("access_token", res)
      setUserDetails((prev)=>({...prev , token:res}))
      // console.log(res)
      mutate(res)
    }
    isAuthenticated && getTokenAndRegister()
  }, [isAuthenticated])
  return (
    <>
    <div style={{background:"var(--black)",overflow:"hidden"}}>
        <Header/>
        <Outlet/>
    </div>
    <Footer/>
    </>
  )
}
// https://dev-vo4123tdnp7bcuws.us.auth0.com/api/v2/