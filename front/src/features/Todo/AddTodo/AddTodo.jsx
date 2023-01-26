import { Input } from "@chakra-ui/react";
import { useState } from "react";
import { CustomToast } from "../../../components/CustomToast";
import style from "./todoadd.module.css";


export function AddTodo() {
    const [todo, setTodo] = useState("");
    const {MyToast} = CustomToast()
    const addTodo = () => {
        if(todo === ""){
            return MyToast("Add Something")
        }
        console.log(todo);
        MyToast("Todo Created","success")
    }
    return (<div className={style.todoDiv}>
        <Input placeholder="enter a new todo" onChange={(e) => setTodo(e.target.value)} />
        <button onClick={addTodo} className={style.addBtn}>Add Todo</button>
    </div>)
}