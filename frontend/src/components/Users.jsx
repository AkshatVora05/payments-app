import { useEffect, useState } from 'react'
import { Button } from './Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function useDebounce(value, delay = 500) {
    const [debounced, setDebounced] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => setDebounced(value), delay);
        return () => clearTimeout(timer);
    }, [value, delay]);

    return debounced;
}

export const Users = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");

    const debouncedFilter = useDebounce(filter, 500);

    useEffect(() => {
        async function getUsers(){
            try{
                const res = await axios.get('http://localhost:3000/api/v1/user/getUsers?filter=' + debouncedFilter, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem('token')
                    }
                });
                setUsers(res.data.user);
            }
            catch(err){
                console.log(err);
            }
        }

        getUsers();
    }, [debouncedFilter]);

    return <div className='mx-4'>
        <div className='font-bold mt-6 text-lg'>
            Users
        </div>
        <div className='my-2'>
            <input type="text" placeholder='Search users...' className='w-full px-2 py-1 rounded border-slate-200'
                onChange={(e) => {
                    setFilter(e.target.value);
                }}
            ></input>
        </div>
        <div>
            {users.map(user => <User key={user._id} user={user}></User>)}
        </div>
    </div>
}

function User({ user }){
    const navigate = useNavigate();

    return <div className='flex justify-between my-4'>
        <div className='flex'>
            <div className='rounded-full flex justify-center h-12 w-12 bg-slate-200 mt-1 mr-2'>
                <div className='flex flex-col justify-center h-full text-xl'>
                    {user.firstname[0].toUpperCase()}
                </div>
            </div>
            <div className='flex flex-col justify-center text-lg'>
                {user.firstname} {user.lastname}
            </div>
        </div>
        <div>
            <Button className='flex flex-col justify-center' label={"Send Money"} onClick={() => {
                navigate('/transfer?id=' + user._id + '&name=' + user.firstname);
            }}></Button>
        </div>
    </div>
}