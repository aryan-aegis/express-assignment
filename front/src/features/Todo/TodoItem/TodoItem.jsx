import { IoIosOptions } from "react-icons/io";
import {Actions} from "../Actions"
import style from "./todoitem.module.css";
// import { Skeleton } from "@chakra-ui/react";
// import { useSelector } from "react-redux";

export function TodoItem({ idx, id, todo, status }) {
    // const {loading} = useSelector(store=>store);
    return (<tr key={id}>
        <td>{idx}.</td>
        <td>
            {todo}
        </td>
        {status ? <td className={style.done}>Done</td> : <td className={style.pending}>Pending</td>}
        <td className={style.options}>
            <IoIosOptions className={style.allActs}/>
            <Actions cssname={style.TodoOpt} id={id} todo={todo} status={status}/>
        </td>
    </tr>)
}