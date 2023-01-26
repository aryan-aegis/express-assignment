import { Link } from "react-router-dom";
import style from "./navbar.module.css";

let paths = [
    {to:"/",path:"Home",isAuth:false},
    {to:"/register",path:"SignUp",isAuth:false},
    {to:"/login",path:"SignIn",isAuth:false},
    {to:"/profile",path:"Profile",isAuth:true},
    {to:"/dashboard",path:"Dashboard",isAuth:true},
]
export function Navbar(){
    return (<div className={style.nav}>
        {paths?.map((el,idx)=>{
            if(!el.isAuth)
                return <Link key={idx+1} to={el.to}>{el.path}</Link>
        })}
    </div>)
}