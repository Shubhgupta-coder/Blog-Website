// import React, {useEffect, useState} from 'react'
// import {useSelector} from 'react-redux'
// import {useNavigate} from 'react-router-dom'

// // ye ek  user ki authentication ka protected ka layout h 
// export default function Protected({children, authentication = true}) {

//     const navigate = useNavigate()
//     const [loader, setLoader] = useState(true)
//     // yaha pr hmne user ki login status nikal lia ki user login h ya nahi 

//     const authStatus = useSelector(state => state.auth.status)

//     useEffect(() => {
//         //TODO: make it more easy to understand

//         // if (authStatus ===true){
//         //     navigate("/")
//         // } else if (authStatus === false) {
//         //     navigate("/login")
//         // }
        
//         //let authValue = authStatus === true ? true : false
//         // yahea pr hm check kr rahe ki hme user ko login krwanaa h yaha fur hme user ko kaha pr redirect kerwan h


//         // dependency-> agr user ko authstatus change hota h ki mtlb user logged in hota h ya logout , ya fir user ki user ki dosre pafe pr rerender hota h . ya fir user ne jo parmeter bheh=ja h  age usme koi change hota h

//         // this is useeffect ki agr yaha pr in dependency  se kuch bhi change hota h to hm re render kenehge
//         if(authentication && authStatus !== authentication){
//             navigate("/login")
//         } else if(!authentication && authStatus !== authentication){
//             navigate("/")
//         }
//         setLoader(false)
//     }, [authStatus, navigate, authentication])

//   return loader ? <h1>Loading...</h1> : <>{children}</>
// }


import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

export default function Protected({children, authentication = true}) {

    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {
        //TODO: make it more easy to understand

        // if (authStatus ===true){
        //     navigate("/")
        // } else if (authStatus === false) {
        //     navigate("/login")
        // }
        
        //let authValue = authStatus === true ? true : false

        if(authentication && authStatus !== authentication){
            navigate("/login")
        } else if(!authentication && authStatus !== authentication){
            navigate("/")
        }
        setLoader(false)
    }, [authStatus, navigate, authentication])

  return loader ? <h1>Loading...</h1> : <>{children}</>
}
