import { Delete } from "./Delete";
import { Edit } from "./Edit";
import style from "./actions.module.css";

export function Actions({id,todo,cssname,status}){
    return (<div className={`${cssname} ${style.actions}`}>
        <Edit id={id} todo={todo}/>
        <Delete id={id} todo={todo}/>
    </div>)
}