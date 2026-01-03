export function Button({ label, onClick }){
    return (
        <div className="pt-4">
            <button onClick={onClick} type="button" className="text-white bg-dark box-border border border-transparent hover:bg-dark-strong focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none w-full">{ label }</button>
        </div>
    )
}