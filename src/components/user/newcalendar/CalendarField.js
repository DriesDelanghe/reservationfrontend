import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types'
import EventField from "./eventField";

const CalendarField = ({dateString, monthList, reservationDate, toggleDate, selectedDates, personList, monthNumber}) => {

    const [day, setDay] = useState('')
    const [month, setMonth] = useState('')
    const [dateText, setDateText] = useState('')
    const [isSameMonth, setIsSameMonth] = useState(true)

    useEffect(() => {
        const dateDate = new Date(dateString);
        setDay(dateDate.getDate() + '')
        if (monthList[dateDate.getMonth()]) {
            const charArray = [...monthList[dateDate.getMonth()].monthName]
            if (charArray[2] !== charArray[1]) {
                setMonth(charArray[0] + charArray[1] + charArray[2])
            } else {
                setMonth(charArray[0] + charArray[1] + charArray[3])
            }
        }
    }, [dateString, monthList])

    useEffect(() => {
        if (monthNumber && monthNumber.id !== new Date(dateString).getMonth()) {
            setDateText(`${day} \n ${month}`)
            console.log(`setting month date for ${dateString}`)
        } else {
            setDateText(day + "")
        }
    }, [dateString, monthNumber, month])

    useEffect(() => {
        if (monthNumber && monthNumber.id !== new Date(dateString).getMonth()){
            setIsSameMonth(false)
            return
        }
        setIsSameMonth(true)
    }, [monthNumber, dateString])

    return (
        <div className={`border p-0 calendar-even-width ${isSameMonth ? null : 'bg-light text-muted'}`}>
            <div className={`p-2 w-100`}>
                <p className={`text-end m-0 fs-6`}>{dateText}</p> <br/>
                {reservationDate && isSameMonth ?
                reservationDate.map((openingDate, index) =>
                    openingDate ?
                    <EventField key={`${dateString}_${index}`} toggleDate={toggleDate} openingDate={openingDate}
                                isFull={openingDate.reservationLimit - openingDate.reservationAmount <= 0}
                                isSelected={!!selectedDates.find(object =>  object.id === openingDate.id)}/>
                                : null
                ): null}
            </div>
        </div>
    )
}

export default CalendarField;

CalendarField.propTypes = {
    isClickable: PropTypes.bool,
    dateString: PropTypes.string,
    monthList: PropTypes.array
}