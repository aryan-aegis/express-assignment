import { ERROR, GET_TODO, LOADING, LOGIN_USER, UPDATE_USER } from "./user.controls"

const initial = {
    user:{
        //username
        //userId
    },
    isAuth:false,
    todo:[
        //array of user's todo
    ],
    loading:false,
    error : false,
}

export const userReducer = (state=initial,{type,payload})=>{
    switch(type){
        case LOGIN_USER:{
            return {...state, user:payload,isAuth:true}
        }
        case UPDATE_USER:{
            return {...state, user:payload}
        }
        case LOADING : {
            return {...state,loading:true}
        }
        case ERROR : {
            return {...state,error:true,loading:false}
        }
        case GET_TODO : {
            return {...state,todo:payload}
        }
        default :
            return state
    }
}