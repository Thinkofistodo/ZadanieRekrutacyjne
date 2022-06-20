import React, {useEffect, useState} from "react";

import "./CalendarField.scss"


interface Props {
    isDayOff: boolean,
    index: number,
    // Zmienia dzień wolny na pracujący i na odwrót
    changeTheDayType: (event: any)=>void,
    // Zmienia obecny dzień kalendarza
    changeCurrentDay: (event: any)=>void,
}

export const CalendarField = (props: any) => {
    const [isDayOff, setIsDayOff] = useState<boolean>(props.isDayOff)

    useEffect(() => {
        setIsDayOff(props.isDayOff)
    }, [props])

    return <>
        <div
            /* Tutaj data-daynumber musi być, żeby css mógł użyć attr() w conent w before */
            data-daynumber={props.index + 1}
            className={`Calendar__Field`}
            onClick={props.changeCurrentDay}>
            <button className={`Calendar__Field-Button ${isDayOff ? "Calendar__Field-ButtonTrue" : ""}`}
                    data-daynumber={props.index + 1}
                    onClick={props.changeTheDayType}>

                <i className={`fa-solid ${isDayOff ? "fa-calendar-xmark" : "fa-calendar"} button__icon`}
                   /* Musi data-daynumber też tutaj być bo innaczej nie działa */
                   data-daynumber={props.index + 1}
                   />
            </button>
        </div>
    </>

}