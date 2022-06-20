import React, {useEffect, useState} from "react";
import "./ListHeader.scss"


interface Props {
    currentDay: number,
    currentMonth: number,
    isCurrentDayOff: boolean,
}

export const ListHeader = (props: Props) => {
    const [currentDay, setCurrentDay] = useState<number>(props.currentDay)
    const [currentMonth, setCurrentMonth] = useState<number>(props.currentMonth)
    const [isCurrentDayOff, setIsCurrentDayOff] = useState<boolean>(props.isCurrentDayOff)

    useEffect(() => {
        setCurrentDay(props.currentDay)
        setCurrentMonth(props.currentMonth)
        setIsCurrentDayOff(props.isCurrentDayOff)
    }, [props])


    return <>
        <div className="ListHeader">
            <h1 className={"ListHeader__title"}>
                {
                    (() => {
                        if (currentDay / 10 < 1) {
                            return "0" + currentDay
                        }
                        return currentDay
                    })()
                }
                .
                {
                    (() => {
                        if (currentMonth / 10 < 1) {
                            return "0" + currentMonth
                        }
                        return currentMonth
                    })()
                }
            </h1>
            <h2 className={"ListHeader__subtitle"}>Dzień {isCurrentDayOff ? "wolny :)" : "pracujący :("}</h2>
        </div>
    </>
}