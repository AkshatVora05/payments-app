import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom"

export function SendMoney(){
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    const name = searchParams.get('name');
    const [amount, setAmount] = useState(0);
    const navigate = useNavigate();

    return <div className="flex justify-center bg-gray-100 h-screen">
        <div className="h-full flex flex-col justify-center">
            <div className="bg-white shadow-lg h-min max-w-md p-4 space-y-6 w-96 rounded-lg">
                <div className="flex flex-col mt-4">
                    <h2 className="text-center font-bold text-3xl">Send Money</h2>
                </div>
                <div className="pt-6">
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                            <span className="text-2xl text-white">{name[0].toUpperCase()}</span>
                        </div>
                        <div className="text-2xl font-semibold">
                            {name}
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <label
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            for="amount">
                            Amount (in Rs)
                        </label>
                        <input
                            type="number"
                            className="flex h-10 w-full rounded-md border-slate-200 my-2 px-3 py-2 text-sm"
                            placeholder="Enter amount"
                            id="amount"
                            onChange={(e) => {
                                setAmount(e.target.value);
                            }}
                        ></input>
                    </div>
                    <button className="justify-center rounded-md text-sm font-medium h-10 px-4 py-2 w-full bg-green-500 text-white transition-colors hover:bg-green-600 my-2" onClick={async () => {
                        try{
                            const res = await axios.post('http://localhost:3000/api/v1/account/transfer', {
                                to: id,
                                amount: parseInt(amount)
                            }, {
                                headers: {
                                    Authorization: "Bearer " + localStorage.getItem('token')
                                }
                            });
                            
                            toast.success(res.data.message);
                            navigate('/dashboard')
                        }
                        catch(err){
                            toast.error(err.response.data.message || "Transaction failed")
                        }
                    }}>
                        Initiate Transfer
                    </button>
                </div>
            </div>
        </div>
    </div>
}