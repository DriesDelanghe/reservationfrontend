import React, {useEffect, useState} from "react"

const AdminCalendarField = ({date, monthArray, month}) => {


    const [monthShort, setMonthShort] = useState('')
    const [dateNumber, setDateNumber] = useState(date.getDate())
    const [monthNumber, setMonthNumber] = useState(date.getMonth())

    useEffect(() => {
        if (date.getDate()) {
            const dateNr = date.getDate()
            setDateNumber(dateNr)
        }
    }, [date])

    useEffect(() => {
        if (date.getMonth()) {
            const monthNr = date.getMonth()
            setMonthNumber(monthNr)
        }
    }, [date])

    //#TODO if month is january displays december, fix it

    useEffect(() => {
            const charArray = [...monthArray[monthNumber].monthName]
            if  (charArray[2] !== charArray[1]) {
                setMonthShort(charArray[0] + charArray[1] + charArray[2])
            }else{
                setMonthShort(charArray[0] + charArray[1] + charArray[3])
            }
    }, [monthNumber])

    return ( monthArray[date.getMonth()] && monthArray[date.getMonth()].monthName ?
        <div className={date.getMonth() === month ? "border calendar-even-width" : "border calendar-even-width bg-light text-muted"}>
            {date.getMonth() !== month ?
                <p>{`${dateNumber} \n ${monthShort}`}</p>
                : <p className={"text-center"}>{`${dateNumber}`}</p>
            }
        </div> : null
    )
}

export default AdminCalendarField;