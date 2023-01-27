import {
    FormControl,
    FormLabel,
    Heading,
    Input,
    InputLeftAddon,
    InputGroup,
    InputRightElement,
    Button
} from '@chakra-ui/react'
import { useState } from 'react';
import { CustomToast } from 'components/CustomToast';
import {Link} from "react-router-dom"
import style from "../SignIn/signin.module.css";

export function SignUp() {
    const [form, setForm] = useState({});
    const [show,setShow] = useState(false);
    let { MyToast } = CustomToast();

    const handChange = (e) => {
        let { name, value } = e.target;
        setForm({ ...form, [name]: value });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!form.username || form.username === "") {
            return MyToast("Enter a username", "info", 1000, "top")
        }
        if (!form.email || !form.email.match(mailformat)) {
            return MyToast("Enter a email address")
        }
        if (!form.phone || form.phone.length < 10) {
            return MyToast("Enter a phone Number")
        }
        if (!form.password) {
            return MyToast("Enter a Password")
        }
        MyToast("Sign Up successful", "success")
        //Array.from(document.querySelectorAll("input")).forEach((el)=>el.value="");
    }
    return (<div>
        <Heading>Welcome to Sign Up page</Heading>
        <form type="form" className={style.mainForm} onSubmit={handleSubmit}>
            <FormControl mt="10px">
                <FormLabel>Username</FormLabel>
                <Input name="username" type='text' placeholder='enter you username' onChange={handChange} />
            </FormControl>
            <FormControl mt="10px">
                <FormLabel>Email address</FormLabel>
                <Input name="email" type='email' placeholder='enter you email' onChange={handChange} />
            </FormControl>
            <FormControl mt="10px">
                <FormLabel>Phone Number</FormLabel>
                <InputGroup>
                    <InputLeftAddon children='+91' color={"black"} />
                    <Input name="phone" type='tel' placeholder='enter phone number' onChange={handChange} />
                </InputGroup>
            </FormControl>
            <FormControl mt="10px">
                <FormLabel>Password</FormLabel>
                <InputGroup size='md'>
                    <Input
                        type={show ? 'text' : 'password'}
                        placeholder='enter your password'
                        name="password"
                        onChange={handChange}
                    />
                    <InputRightElement width='4.5rem'>
                        <Button size='sm' onClick={()=>setShow(!show)} color={"rgb(8, 8, 68)"} background={"white"}>
                            {show ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <button className={style.subBtn} type="submit">Sign Up</button>
        </form>
        <div className={style.infoDiv}>Already have an account, <Link to="/login"><span color="orangered">Sign In</span></Link></div>
    </div>)
}