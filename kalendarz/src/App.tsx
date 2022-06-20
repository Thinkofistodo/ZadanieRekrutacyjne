import React, {useEffect, useState} from 'react';
import './App.scss';
import {Calendar} from "./components/Calendar/Calendar";
import {MonthChanger} from "./components/MonthChanger/MonthChanger";
import {staticData} from "./data/data"
import {ListHeader} from "./components/ListHeader/ListHeader";
import {List} from "./components/List/List";

// STRUKTURA OBIEKTU Z DANYMI
// {
//     // ROK
//     2021: {
//         months: {
//             // MIESIĄC
//             1: {
//                 // Każdy element tablicy to jeden dzień. Przechowywana informacja czy jest wolny czy też nie
//                 days: [false, false, ...]
//                 // Każdy jeden element to jeden dzień. Przechowywana jest tablica zadań,
//                 // które są tablicami składającymi się z priorytetu i treści zadania
//                 to.do: [
//                         // dzień 1
//                         [
//                             [7,"Zadanie 1 dnia 1"], [8,"Zadanie 2 dnia 1"]
//                         ],
//                         // dzień 2
//                         [
//                             [1,"Zadanie 1 dnia 2"], [1,"Zadanie 2 dnia 2"]
//                         ],
//                         // dzień 3...
//                 ]
//             }
//
//         }
//     }
// }

export const App = () => {
    const [month, setMonth] = useState<number>(1)
    const [year, setYear] = useState<number>(2022)
    const [data, setData] = useState(staticData)
    const [currentDay, setCurrentDay] = useState<number>(1)

    useEffect(()=>{

        const storageData = localStorage.getItem("data")
        if (storageData  === null) {
            setData(staticData)
            console.log("Program załadował sztywne dane.")
            localStorage.setItem("data", JSON.stringify(staticData))
            return
        }
        setData(JSON.parse(storageData))
        console.log("Program załadował dane z localeStorage.")
    }, [])

    useEffect(()=>{
        localStorage.setItem("data", JSON.stringify(data))
    }, [data])

    const changeMonth = (monthNumber: number): void => {
        setMonth(monthNumber)
        setCurrentDay(1)
    }

    const changeYear = (yearNumber: number): void => {
        setYear(yearNumber)
    }

    const changeCurrentDay = (e: any): void => {
        setCurrentDay(Number(e.target.dataset.daynumber))
    }

    const changeTheDayType = (e: any): void => {
        const dayNumber = Number(e.target.dataset.daynumber)
        setData((prev) => {
            const object = JSON.parse(JSON.stringify(prev))
            object[year].months[month].days = prev[year].months[month].days
                .map((e: any, index: any) => {
                    if (index === dayNumber - 1) return !e
                    return e
                })
           return object
        })

    }

    function arraysEqual(a1: any,a2: any): boolean {
        return JSON.stringify(a1)==JSON.stringify(a2);
    }

    const deleteTask = (e: any): void => {
        // przycisk ma w data-task informajce na temat priorytetu i contentu zadania
        // robię z tego tablicę i porównuję do każdej innej tablicy w tym dniu, żeby zdobyć jej index
        // jak już mam index to mogę ją usunąć

        let element = e.target.dataset.task.split(",")

        element[0] = Number(element[0])
        let index: number;

        const dummyVar = data[year].months[month].todo[currentDay - 1].forEach((el: any, ind: any) => {
            if(arraysEqual(el, element)) index = ind
        })

        setData((prev) => {
            const object = JSON.parse(JSON.stringify(prev))
            object[year].months[month].todo[currentDay - 1] = object[year].months[month].todo[currentDay - 1]
                .filter((element: any, id: any)=> {
                    return index !== id
                })
            return object
        })
    }

    const addTask = (priority: number, text: string): void => {
        setData((prev) => {
            const object = JSON.parse(JSON.stringify(prev))
            object[year].months[month].todo[currentDay - 1].push([priority, text])
            return object
        })
    }

    if(data === null){
        return <h1>Wczytywanie danych</h1>
    }

    return <>
        <div className="App__Wrapper">
            <MonthChanger changeYear={changeYear}
                          changeMonth={changeMonth}/>
            <Calendar isDayOffTable={data[year].months[month].days}
                      changeTheDayType={changeTheDayType}
                      changeCurrentDay={changeCurrentDay}
            />
        </div>
        <div className="App__Wrapper">
            <ListHeader currentDay={currentDay} currentMonth={month} isCurrentDayOff={data[year].months[month].days[currentDay - 1]}/>
            <List addTask={addTask} deleteTask={deleteTask} todos={data[year].months[month].todo[currentDay - 1]}/>
        </div>
    </>
}


