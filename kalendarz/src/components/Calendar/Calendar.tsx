import React, {useEffect, useState} from "react";
import {CalendarField} from "../CalendarField/CalendarField";
import "./Calendar.scss"

interface Props {
    isDayOffTable: boolean[],
    // Zmienia dzień wolny na pracujący i na odwrót
    changeTheDayType: (event: any)=>void,
    // Zmienia obecny dzień kalendarza
    changeCurrentDay: (event: any)=>void,
}

export const Calendar = (props: Props) => {
    const [isDayOffTable, setIsDayOffTable] = useState<boolean[]>(props.isDayOffTable)


    useEffect(()=>{
        setIsDayOffTable(props.isDayOffTable)
    }, [props])

    return <div className={"Calendar"}>
        {
            [...isDayOffTable].map((e, index: number) => {
            return <CalendarField index={index}
                                  changeTheDayType={props.changeTheDayType}
                                  isDayOff={e}
                                  key={index}
                                  changeCurrentDay={props.changeCurrentDay}
            />
            })
        }
    </div>

}