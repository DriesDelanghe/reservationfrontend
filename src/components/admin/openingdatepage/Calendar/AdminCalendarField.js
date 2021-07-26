import React, {useEffect, useState} from "react"

const AdminCalendarField = ({date, monthArray, month, openingDate}) => {


    const [monthShort, setMonthShort] = useState('')
    const [dateNumber, setDateNumber] = useState(date.getDate())
    const [monthNumber, setMonthNumber] = useState(date.getMonth())

    useEffect(() => {
        const dateNr = date.getDate()
        setDateNumber(dateNr)
    }, [date])

    useEffect(() => {
        const monthNr = date.getMonth()
        setMonthNumber(monthNr)
    }, [date])

    useEffect(() => {
        const charArray = [...monthArray[monthNumber].monthName]
        if (charArray[2] !== charArray[1]) {
            setMonthShort(charArray[0] + charArray[1] + charArray[2])
        } else {
            setMonthShort(charArray[0] + charArray[1] + charArray[3])
        }
    }, [monthNumber])

    return (monthArray[monthNumber] ?
            <div
                className={monthNumber === month ? "border calendar-even-width d-flex justify-content-start flex-column" : "border calendar-even-width bg-light text-muted"}>
                {monthNumber !== month ?
                    <p className={`m-0`}>{`${dateNumber} \n ${monthShort}`}</p>
                    : <p className={"text-center m-0"}>{`${dateNumber}`}</p>
                }
                <div className={openingDate ? `w-100 alert alert-primary p-1 rounded-2` : `w-100 alert p-1 rounded-2`}>
                    {openingDate ?
                        <p className={`small m-0`}>
                            {openingDate.openingHour} - {openingDate.closingHour}
                        </p>
                        : null}
                </div>
            </div> : null
    )
}

export default AdminCalendarField;