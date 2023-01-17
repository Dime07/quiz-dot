export function ButtonPrimary(props){
    return(
        <button onClick={props.click} type={props.type} className="py-3 px-6 bg-green-400 w-full rounded-lg text-white capitalize font-semibold text-lg hover:bg-green-300">
            {props.text}
        </button>
    )
}

export function ButtonSecondary(props){
    return(
        <button onClick={props.click} type={props.type} className="py-3 px-6 border-green-400 border-[1px] w-full rounded-lg text-green-300 capitalize font-semibold text-lg hover:border-green-300">
            {props.text}
        </button>
    )
}