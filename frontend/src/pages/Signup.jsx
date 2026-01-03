import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios"
import toast from 'react-hot-toast';

export function Signup(){
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="bg-white w-80 p-2 px-4 rounded-lg h-max text-center">
                <Heading label={"Signup"}></Heading>
                <SubHeading label={"Enter your information to create an account"}></SubHeading>
                <InputBox label={"First Name"} placeholder={"John"}
                    onChange={(e) => {
                        setFirstName(e.target.value);
                    }}
                ></InputBox>
                <InputBox label={"Last Name"} placeholder={"Doe"}
                    onChange={(e) => {
                        setLastName(e.target.value);
                    }}
                ></InputBox>
                <InputBox label={"Username"} placeholder={"johndoe@example.com"}
                    onChange={(e) => {
                        setUsername(e.target.value);
                    }}
                ></InputBox>
                <InputBox type="password" label={"Password"} placeholder={"Abc@123"}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                ></InputBox>
                <Button 
                    label="Signup" 
                    onClick={async () => {
                        try {
                            const res = await axios.post('http://localhost:3000/api/v1/auth/signup', {
                                firstname: firstName,
                                lastname: lastName,
                                username,
                                password
                            });
                            toast.success(res.data.message);
                        } 
                        catch (error) {
                            toast.error(error.response.data.message || 'Signup failed');
                        }
                    }}/>
                <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"}></BottomWarning>
            </div>
        </div>
    </div>
}