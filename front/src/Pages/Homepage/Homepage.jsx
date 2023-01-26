import style from "./home.module.css";
import { Heading } from "@chakra-ui/react";
import { todoArr } from "../todoArr";
import {TodoList} from "../../features/Todo/TodoList/TodoList"
import {AddTodo} from "../../features/Todo/AddTodo/AddTodo"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getTodos } from "../../redux/user/user.actions";


export function Homepage() {
    const {todo} = useSelector(store=>store);
    const dispatch = useDispatch();
    //console.log(todo);

    useEffect(()=>{
        dispatch(getTodos());
    },[]);
    return (<div className={style.home}>
        <Heading>Welcome to Todo App</Heading>
        <AddTodo/>
        {todo?.length!=0 ?
            <TodoList todoArr={todo}/>
        :
            <div>No Todo's</div>
        }
    </div>)
}