import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function Signin(){
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="bg-white rounded-lg h-max text-center px-4 p-2 w-80">
                <Heading label={"Signin"}></Heading>
                <SubHeading label={"Enter your credentials to access your account"}></SubHeading>
                <InputBox label={"Username"} placeholder={"johndoe@example.com"}
                    onChange={(e) => {
                        setUsername(e.target.value);
                    }}
                ></InputBox>
                <InputBox type='password' label={"Password"} placeholder={"Abc@123"}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                ></InputBox>
                <Button label={"Signin"} 
                onClick={async () => {
                    try{
                        const res = await axios.post('http://localhost:3000/api/v1/auth/signin', {
                            username,
                            password
                        });
                        
                        localStorage.setItem("token", res.data.token);
                        toast.success(res.data.message);
                        navigate('/dashboard');
                    }
                    catch(err){
                        toast.error(err?.response?.data?.message || "Signin failed");
                    }
                }}
                ></Button>
                <BottomWarning label={"Don't have an account?"} buttonText={"Sign Up"} to={'/signup'}></BottomWarning>
            </div>
        </div>
    </div>
}