import { useState } from "react";
import {EditModal} from "./ActionModal/EditModal";
import style from "./actions.module.css"

export function Edit({id,todo}){
    const [isOpen,setOpen] = useState(false);
    const openEdit = ()=>{
        setOpen(prev => !prev);
    }    
    return (<div className={style.edit} onClick={openEdit}>
        Edit
        {isOpen && <EditModal isOpen={isOpen} onClose={openEdit} todo={todo} id={id}/>}
    </div>)
}