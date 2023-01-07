import { createSlice } from "@reduxjs/toolkit";


export const alertsSlice = createSlice({


    name:"alerts",
    initialState:{
        loading:false
    },
    reducers:{
        showLoding:(state)=>{
            state.loading = true;
        },
        hideLoading:(state)=>{
            state.loading = false;
        }
    }
})


export const {showLoding,hideLoading} = alertsSlice.actions;