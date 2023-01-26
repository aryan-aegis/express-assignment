import { TodoItem } from "../TodoItem/TodoItem"
import style from "./todo.module.css"

export function TodoList({todoArr}){
    return (<table className={style.mainTable}>
        <thead className={style.tabHead}>
            <tr>
                <th>S.No.</th>
                <th>Todo</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {todoArr?.map((el,idx)=>{
                return <TodoItem key={el?.id} idx={idx+1} id={el?.id} status={el?.completed} todo={el?.title}/>
            })}
        </tbody>
    </table>)
}