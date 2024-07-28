import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
// import { logout } from '../../store/authSlice'
import {logout} from '../../store/authSlice'
function LogoutBtn() {
    const dispatch = useDispatch();

    // in this we use logout which we got from appwrite as backend as a service . And it is a promise thats why we use then and catch
    const logoutHandler=()=>{
        // if it is successfully logout then we dispatch an action of logout 
        authService.logout().
        then(()=>{dispatch(logout())})
    }
  return (
    <button className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full' onClick={logoutHandler}> Logout </button>
  )
}

export default LogoutBtn
