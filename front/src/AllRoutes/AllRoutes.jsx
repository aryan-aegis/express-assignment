import {Routes,Route} from "react-router-dom";
import { Homepage } from "Pages/Homepage/Homepage";
import { Profile } from "Pages/Profile/Profile";
import { SignIn } from "Pages/SignIn/SignIn";
import { SignUp } from "Pages/SignUp/SignUp";

export function AllRoutes(){
    return (<Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/login" element={<SignIn/>}/>
        <Route path="/register" element={<SignUp/>}/>
        <Route path="/profile" element={<Profile/>}/>
    </Routes>)
}