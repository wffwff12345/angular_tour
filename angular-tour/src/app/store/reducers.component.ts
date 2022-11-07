import { createSlice } from "@reduxjs/toolkit";
export const counterSlice =createSlice({
    name: 'counter',
    initialState: {
        value: 4,
        name:"",
        token:0
    },
    reducers: {
        added:(state:any)=>{
            console.log('add');
        },
        deleteed:(state:any)=>{
            console.log("del");
        },
        setTokened:(state:any,token:any)=>{
            state.token=token;
            console.log("设置token");
            console.log(state.token);
        },
        removeTokened:(state:any)=>{
            state.token=null;
            console.log("删除token");
            console.log(state.token);
        },
    }
})
export const{added,deleteed,setTokened,removeTokened}=counterSlice.actions