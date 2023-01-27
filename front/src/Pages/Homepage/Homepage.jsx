import style from "./home.module.css";
import { Heading } from "@chakra-ui/react";

import { TodoList } from "features/Todo/TodoList/TodoList";
import { AddTodo } from "features/Todo/AddTodo/AddTodo";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getTodos } from "redux/user/user.actions";
import { TodoLoad } from "features/Todo/Skeleton/TodoLoad";


export function Homepage() {
    const {todo,loading} = useSelector(store=>store);
    const dispatch = useDispatch();
    //console.log(todo);

    useEffect(()=>{
        dispatch(getTodos());
    },[]);
    return (<div className={style.home}>
        <Heading>Welcome to Todo App</Heading>
        <AddTodo/>
        {!loading ?
            <TodoList todoArr={todo}/>
        :
            <TodoLoad/>
        }
    </div>)
}