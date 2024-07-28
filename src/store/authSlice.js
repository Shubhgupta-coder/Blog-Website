// ye authSlice wala hamara user k authentication ko track krne k lie h mtlb user Authenticated h yaa nahi

import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    // by default status false , ki mtlb user authenticated nhi h
    status:false,
    userData:null
}
const authSlice = createSlice({
      name: "auth",
      initialState,
      reducers:{
        login:(state,action)=>{
            // sbse phele status true krdo
            state.status=true;
            // now hame userDate bhi to fill krna h  action.payload se aaega jo ki 
            state.userData = action.payload.userData;
        },

        logout:(state)=>{
            // in case of logout ham apne status ko false krdenge and userdata ko nul kedenge
            state.status=false;
            state.userData = null;
        }
      }
})

export default authSlice.reducer;
// yaha pr hm reducers k andar jo function h jinhe hm action bol te h unhe hm export krte h 
export const {login,logout} = authSlice.actions