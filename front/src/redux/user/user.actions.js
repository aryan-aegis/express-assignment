import { ERROR, GET_TODO, LOADING } from "./user.controls"
import axios from "axios"

let api = "https://jsonplaceholder.typicode.com/todos/?_limit=10"
export const getTodos = ()=>async (dispatch)=>{
    dispatch({type:LOADING});
    try{
        let data = await axios.get(api)
        dispatch({type:GET_TODO,payload:data.data})
    }catch(e){
        console.log(e)
        dispatch({type:ERROR});
    }
}