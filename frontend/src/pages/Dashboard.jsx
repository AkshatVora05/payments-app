import { useEffect, useState } from "react";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import axios from 'axios';
import { OrbitProgress } from 'react-loading-indicators'
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function Dashboard(){
    const [balance, setBalance] = useState(0);
    const [userData, setUserData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function getData(){
            try{
                setIsLoading(true);

                const token = localStorage.getItem('token');

                const userRes = await axios.get('http://localhost:3000/api/v1/user/profile', {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                });

                setUserData(userRes.data.user);

                const balRes = await axios.get('http://localhost:3000/api/v1/account/balance', {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                });

                setBalance(balRes.data.balance);
            }
            catch(error){
                toast.error(error?.response?.data?.message || 'Unauthorized access');
                navigate('/signin');
            }
            finally{
                setIsLoading(false);
            }
        }

        getData();
    }, [navigate]);

    if(isLoading){
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50">
                <OrbitProgress variant="track-disc" dense color="#454f45" size="medium" text="Loading" textColor="" />        
            </div>    
        )
    }
    else{
        return <div>
            <Appbar name={userData.firstname}></Appbar>
            <Balance balance={balance}></Balance>
            <Users></Users>
        </div>
    }
    
}