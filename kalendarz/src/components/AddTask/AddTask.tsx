import React, {useState} from "react";
import "./AddTask.scss"

interface Props {
    // Adds new task
    addTask: (priority: number, content: string)=> void,
}

export const AddTask = (props: Props) => {
    const [selectValue, setSelectValue] = useState<number>(1)
    const [taskContent, setTaskContent] = useState<string>("")

    const changeSelectValue = (e: any) => {
        setSelectValue(e.target.value)
    };

    const submitForm = (e: React.FormEvent) => {
        e.preventDefault()
        props.addTask(Number(selectValue), taskContent)
    };

    const changeTaskContentValue = (e: any) => {
        setTaskContent(e.target.value)
    };

    return <form className={"AddTask"}
                 onSubmit={submitForm}>
            <select onChange={changeSelectValue}
                    value={selectValue}
                    className={"AddTask__priority"}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
            </select>

            <input className={"AddTask__task"}
                   type="text"
                   onChange={changeTaskContentValue}
                   value={taskContent}
                   placeholder={"Zatrudnić Dawida w firmie..."}
            />
        <button className={"AddTask__send"} type="submit"><i className="fa-solid fa-plus"></i></button>
        </form>
}