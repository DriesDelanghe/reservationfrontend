import {useEffect, useState} from "react";
import PropTypes from 'prop-types'

const CalendarField = ({dateString, monthList, reservationDate, toggleDate, selectedDates, personList, monthNumber}) => {

    const [day, setDay] = useState('')
    const [month, setMonth] = useState('')
    const [selected, setSelected] = useState();
    const [dateText, setDateText] = useState('')
    const [reservationsLeft, setReservationsLeft] = useState(0)
    const [reservationAmount, setReservationAmount] = useState(0)
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
        if (!!selectedDates.find(selected => new Date(selected.openingDate).getTime() === new Date(dateString).getTime())) {
            setSelected(true)
            return
        }
        setSelected(false)
    }, [selectedDates, dateString])

    useEffect(() => {
        if (reservationDate) setReservationsLeft(reservationDate.reservationLimit - reservationDate.reservationAmount)

    }, [reservationDate])

    useEffect(() => {
        if (personList) setReservationAmount(personList.length)
    }, [personList])

    useEffect(() => {
        if (monthNumber && monthNumber.id !== new Date(dateString).getMonth()){
            setIsSameMonth(false)
            return
        }
        setIsSameMonth(true)
    }, [monthNumber, dateString])

    return (
        <div className={`border p-0 calendar-even-width ${isSameMonth ? null : 'bg-light text-muted'}`} onClick={() => toggleDate(reservationDate.id)}>
            <div className={`p-2 w-100`}>
                <p className={`text-end m-0 fs-6 ${selected ? 'bg-success rounded-2' : null}`}>{dateText}</p> <br/>
                {reservationDate ?
                    <p className={'text-start m-0 lead fs-6 text-muted'}>{reservationDate.reservationAmount}/ {reservationDate.reservationLimit}</p>
                    : null}
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