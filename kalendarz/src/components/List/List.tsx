import React, {useEffect, useState} from "react";
import "./List.scss"
import {AddTask} from "../AddTask/AddTask";
import {Task} from "../Task/Task"

interface Props {
    todos: any,
    // Dodaje zadanie
    addTask: (priority: number, text: string)=>void,
    // Usuwa zadanie
    deleteTask: (e: any)=> void
}

export const List= (props: Props) => {
    const [todo, setTodo] = useState<[][]>(props.todos)

    useEffect(()=>{
        setTodo(props.todos)
    }, [props])

    return <>
       <div className="List">
           <h1 className={"List__addTitle"}>Dodaj Zadanie</h1>
           <AddTask addTask={props.addTask}/>
           <h1 className={"List__tasksTitle"}>Lista zadań:</h1>
           {
               [...todo]
                   .sort((a: any[], b: any[]): number => b[0] - a[0])
                   .map((element: any[], index: number) => <Task
                       key={index}
                       index={index}
                       priority={element[0]}
                       todo={element[1]}
                       className="List__TaskWrap"
                       deleteTask={props.deleteTask}
                   />)
           }
       </div>
    </>
}