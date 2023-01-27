import {
    FormControl,
    FormLabel,
    Heading,
    Input,
    InputRightElement,
    InputGroup,
    Button,
} from '@chakra-ui/react'
import { useState } from 'react';
import { CustomToast } from 'components/CustomToast';
import { Link } from 'react-router-dom';
import style from "./signin.module.css";

export function SignIn() {
    const [form, setForm] = useState({});
    const [show, setShow] = useState(false);
    let { MyToast } = CustomToast();
    const handChange = (e) => {
        let { name, value } = e.target;
        setForm({ ...form, [name]: value });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (!form.email || !form.email.match(mailformat)) {
            return MyToast("Enter your email address")
        }
        if (!form.password) {
            return MyToast("Enter your password")
        }
        MyToast("Sign In successful", "success")
        //Array.from(document.querySelectorAll("input")).forEach((el)=>el.value="");
    }
    return (<div>
        <Heading>Welcome to Sign In page</Heading>
        <form type="form" className={style.mainForm} onSubmit={handleSubmit}>
            <FormControl mt="10px">
                <FormLabel>Email address</FormLabel>
                <Input name="email" type='email' placeholder='enter you email' onChange={handChange} />
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
                        <Button size='sm' onClick={() => setShow(!show)} color={"rgb(8, 8, 68)"} background={"white"}>
                            {show ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <button className={style.subBtn} type="submit">Sign In</button>
            <div className={style.infoDiv}>Don't have an account, <Link to="/register"><span color="orangered">Create one</span></Link></div>
        </form>
    </div>)
}