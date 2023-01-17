import { useState } from "react"


export function CardMultiple(props){
    const [selected, setSelected] = useState(false)

    const selectChoice = (e) => {
        setSelected(props.text)
        props.answer(e.target.dataset.answer)
    }

    return(
        <div data-answer={props.text} onClick={(e) => selectChoice(e)} className={`${selected === props.selected ? 'bg-blue-300 text-white' : 'bg-white'} p-4  shadow-md rounded-lg hover:bg-blue-300 cursor-pointer hover:text-white font-semibold`}>
            {props.text}
        </div>
    )
}