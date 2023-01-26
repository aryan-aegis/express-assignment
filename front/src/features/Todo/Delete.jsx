import { useState } from "react"
import {DeleteModal} from "./ActionModal/DeleteModal"
import style from "./actions.module.css"

export function Delete({id,todo}){
    const [isOpen,setOpen] = useState(false);
    const openDelete = ()=>{
        setOpen(prev => !prev);
    }
    return (<div className={style.delete} onClick={openDelete}>
        Delete
        {isOpen && <DeleteModal id={id} todo={todo} isOpen={isOpen} onClose={openDelete}/>}
    </div>)
}