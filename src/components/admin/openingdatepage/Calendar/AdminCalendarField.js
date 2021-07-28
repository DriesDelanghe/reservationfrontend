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
            <div className={monthNumber === month ? "border calendar-even-width d-flex justify-content-start flex-column p-0"
                : "border calendar-even-width bg-light text-muted p-0"}>
                {monthNumber !== month ?
                    <p className={`m-0`}>{`${dateNumber} \n ${monthShort}`}</p>
                    : <p className={"text-center m-0"}>{`${dateNumber}`}</p>
                }
                {openingDate && openingDate[0] ?
                    openingDate.map((openingdate, index) =>
                        <div key={index} className={`w-100 alert alert-primary p-1 rounded-2 text-truncate`}>
                            <p className={`small m-0`}>
                                {openingdate.eventName}
                            </p>
                        </div>
                    ) : null}
            </div> : null
    )
}

export default AdminCalendarField;