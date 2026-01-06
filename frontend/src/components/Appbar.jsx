import { useNavigate } from "react-router-dom";

export function Appbar({ name }){
    const navigate = useNavigate();
    return (
        <div className="shadow h-14 flex justify-between">
            <div className="flex flex-col justify-center ml-4">
                Payments App
            </div>
            <div className="flex">
                <div className="flex flex-col justify-center h-full mr-4">
                    Hello {name}
                </div>
                <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                    <div className="flex flex-col justify-center h-full text-xl">
                        {name?.[0]?.toUpperCase()}
                    </div>
                </div>
                <div className="pt-2 pr-2">
                    <button onClick={() => {
                        localStorage.removeItem('token');
                        navigate('/signin', { replace: true });
                    }} type="button" className="text-white bg-danger box-border border border-transparent hover:bg-danger-strong focus:ring-4 focus:ring-danger-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">Signout</button>
                </div>
            </div>
        </div>
    )
}