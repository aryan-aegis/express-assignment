import {Routes,Route} from "react-router-dom";
import {Homepage} from "../Pages/Homepage/Homepage";
import {SignIn} from "../Pages/SignIn/SignIn";

export function AllRoutes(){
    return (<Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/user" element={<SignIn/>}/>
    </Routes>)
}