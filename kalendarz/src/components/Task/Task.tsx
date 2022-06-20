import React, {useEffect, useState} from "react";
import "./Task.scss"

interface Props {
    todo: string,
    priority: number,
    index: number,
    deleteTask: (e: any)=>void,
    // Nie wiem dlaczego, ale bez tego poniżej nie działa
    className: string,
}

export const Task = (props: Props) => {
    const [taskContent, setTaskContent] = useState<string>(props.todo)
    const [priority, setPriority] = useState<number>(props.priority)
    const [index, setIndex] = useState<number>(props.index)

    useEffect(()=>{
        setTaskContent(props.todo)
        setPriority(props.priority)
        setIndex(props.index)
    },[props])

    const returnColorBasedOnPriority = (priority: number): string => {
        switch (priority) {
            case 1:
                return "#90f0db";
            case 2:
                return "#90f0c6";
            case 3:
                return "#90f0b0";
            case 4:
                return "#92f090";
            case 5:
                return "#adf090";
            case 6:
                return "#cef090";
            case 7:
                return "#e6f090";
            case 8:
                return "#f0d390";
            case 9:
                return "#f0b690";
            case 10:
                return "#f2726f";
        }
        return "white"
    }

    return <div className={"Task "}>
        <div className={"Task__priority"} style={{backgroundColor: returnColorBasedOnPriority(priority)}}>{priority}</div>
        <p className={"Task__content"}>{taskContent}</p>
        <button className={"Task__delete"}
                data-index={index}
                data-task={[priority, taskContent]}
                onClick={props.deleteTask}
                >
            <i className="fa-solid fa-ban"
               data-task={[priority, taskContent]}
            ></i>
        </button>
    </div>


}