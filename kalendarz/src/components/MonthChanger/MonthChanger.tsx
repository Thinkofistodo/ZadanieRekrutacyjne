import React, {useEffect, useState} from "react";
import "./MonthChanger.scss"

interface Props {
    changeYear: (number: number)=> void,
    changeMonth: (number: number)=> void,
}

export const MonthChanger = (props: Props) => {
    const [month, setMonth] = useState<number>(1)
    const [year, setYear] = useState<number>(2022)


    const changeMonthRight = () => {
        // Kalendarz się kończy w 2035 roku. Jak wtedy klient zadzwoni to dopiero będziemy się zastanawiać co robić.
        if (month === 12 && year === 2035) return
        setMonth((prev: number) => {
            if (prev === 12) {
                setYear(prev => year + 1)
                return 1
            }
            return month + 1
        })
    }

    const returnMonthName = (month: number): string => {
        switch (month) {
            case 1:
                return "styczeń"
            case 2:
                return "luty"
            case 3:
                return "marzec"
            case 4:
                return "kwiecień"
            case 5:
                return "maj"
            case 6:
                return "czerwiec"
            case 7:
                return "lipiec"
            case 8:
                return "sierpień"
            case 9:
                return "wrzesień"
            case 10:
                return "październik"
            case 11:
                return "listopad"
            case 12:
                return "grudzień"
        }
        return "Something's wrong, I can feel it"
    }

    const changeMonthLeft = () => {
        // Nie można cofnąć się dalej, niż do stycznia poprzedniego roku.
        if (month === 1 && year === new Date().getFullYear() - 1) return
        setMonth((prev: number) => {
            if (prev === 1) {
                setYear(prev => year - 1)
                return 12
            }
            return month - 1
        })
    }


    useEffect(()=>{
        props.changeYear(year)
        props.changeMonth(month)
    }, [month, year])

    return (
        <div className="MonthChanger">
            <i className="fa-solid
                          fa-chevron-left
                          MonthChanger_arrow
                          MonthChanger__leftArrow"
               onClick={changeMonthLeft}/>

            <div className="MonthChanger__textWrapper">
                <h1 className="MonthChanger__textWrapper-title">{returnMonthName(month)}</h1>
                <h2 className="MonthChanger__textWrapper-subtitle">{year}</h2>
            </div>
            <i className="fa-solid
                          fa-chevron-right
                          MonthChanger_arrow
                          MonthChanger__rightArrow"
               onClick={changeMonthRight}/>
        </div>
    )
}