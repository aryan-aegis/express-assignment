import { NavLink } from "react-router-dom";
import style from "./navbar.module.css";

let paths = [
    { to: "/", path: "Home", isAuth: false },
    { to: "/register", path: "Sign Up", isAuth: false },
    { to: "/login", path: "Sign In", isAuth: false },
    { to: "/profile", path: "Profile", isAuth: true },
    { to: "/dashboard", path: "Dashboard", isAuth: true },
]
export function Navbar() {
    return (<div className={style.nav}>
        {paths?.map((el, idx) => {
            //if (!el.isAuth)
                return <NavLink key={idx + 1} to={el.to}
                    style={({ isActive }) =>
                        isActive ?
                            { color: "orangered", textDecoration: "underline orangered", textUnderlineOffset: "5px" }
                            : { color: "white" }
                    }
                >{el.path}</NavLink>
        })}
    </div>)
}