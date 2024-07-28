import React from 'react';
import { useState } from 'react'
import { useEffect } from 'react';
import {useDispatch} from 'react-redux';
import './App.css'
import { login,logout } from './store/authSlice';
import authservice from './appwrite/auth';
import { Footer, Header } from './components';
import { Outlet } from 'react-router-dom';
 
function App() {
  const [loading,setLoading]=useState(true);
  const dispatch = useDispatch();

  // ab jaise hi application load ho to e useEffect lo or useEffect se poocho ki hm logged in h ya nahi
  useEffect(()=>{
    // currentuser hme user data h agr hme user milta h to hm user ka data ko dispatch krte h login wale reuducer jaha pr wwo user ka data set kr dega action.payload ki help se
      authservice.getCurrentUser()
      .then((userData)=>{
          if(userData){
            // disatch k andatr hm reducer  ko call krte h  or reducer k andar hmne useradtata ko pass krddia 
              dispatch(login({userData}))
          }
          else{
            dispatch(logout());  //agar hamara user logged in nhi h to hm user ko log out kr deta h
          }
      })
      // jb hamara saara kaam ho jaaye to ham loading ko false kr denge  
      .finally(()=>{setLoading(false)})
  },[])
 

  return !loading?(
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
        <div className='w-full block'>
         <Header/>
           <main>
            <Outlet/>
           </main>
         <Footer/>
        </div>
    </div>
  ):null
}

export default App
