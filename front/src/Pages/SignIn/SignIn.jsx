import {
    FormControl,
    FormLabel,
    Heading,
    Input,
    InputLeftAddon,
    InputGroup,
} from '@chakra-ui/react'
import { useState } from 'react';
import { CustomToast } from '../../components/CustomToast';
import style from "../SignIn/signin.module.css";

export function SignIn() {
    const [form,setForm] = useState({});
    let {MyToast} = CustomToast();
    const handChange = (e)=>{
        let {name,value} = e.target;
        setForm({...form,[name]:value});
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(!form.username || form.username === ""){
            return MyToast("Enter a username","info",1000,"top")
        }
        if(!form.email || !form.email.match(mailformat)){
            return MyToast("Enter a email address")
        }
        if(!form.phone || form.phone.length <10){
            return MyToast("Enter a phone Number")
        }
        MyToast("Registration successful","success")
        //Array.from(document.querySelectorAll("input")).forEach((el)=>el.value="");
    }
    return (<div>
        <Heading>Welcome to SingIn page</Heading>
        <form type="form" className={style.mainForm} onSubmit={handleSubmit}>
            <FormControl mt="10px">
                <FormLabel>Username</FormLabel>
                <Input name="username" type='text' placeholder='enter you username' onChange={handChange}/>
            </FormControl>
            <FormControl mt="10px">
                <FormLabel>Email address</FormLabel>
                <Input name="email" type='email' placeholder='enter you email' onChange={handChange}/>
            </FormControl>
            <FormControl mt="10px">
                <FormLabel>Phone Number</FormLabel>
                <InputGroup>
                    <InputLeftAddon children='+91' color={"black"}/>
                    <Input name="phone" type='tel' placeholder='enter phone number' onChange={handChange}/>
                </InputGroup>
            </FormControl>
            <button className={style.subBtn} type="submit">Submit</button>
        </form>
    </div>)
}