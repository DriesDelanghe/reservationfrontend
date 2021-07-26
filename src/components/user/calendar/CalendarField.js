import PropTypes from 'prop-types'
import {useEffect, useState} from "react";

const CalendarField = ({dateString, isClickable, monthList, reservationDate, toggleDate, selectedDates, personList}) => {

    const [day, setDay] = useState('')
    const [month, setMonth] = useState('')
    const [selected, setSelected] = useState();

    useEffect(() => {
        const dateDate = new Date(dateString);
        setDay(dateDate.getDate() + '')
        if (monthList[dateDate.getMonth()]){
            const charArray = [...monthList[dateDate.getMonth()].monthName]
            if  (charArray[2] !== charArray[1]) {
            setMonth(charArray[0] + charArray[1] + charArray[2])
            }else{
                setMonth(charArray[0] + charArray[1] + charArray[3])
            }
        }
    }, [])



    useEffect(() => {
        if (!!selectedDates.find(selected => new Date(selected.openingDate).getTime() === new Date(dateString).getTime())) {
            setSelected(true)
            return
        }
        setSelected(false)
    }, [selectedDates, dateString])

    if (isClickable) {

        const reservationsLeft = reservationDate.reservationLimit - reservationDate.reservationAmount;
        const reservationAmount = personList.length;

        return (
            <td className={'border p-0 calendar-even-width'} onChange={() => toggleDate(reservationDate.id)}>
                <label htmlFor={`${day}${month}`} className={'w-100 h-100 p-0'}>
                    <input type="checkbox" id={`${day}${month}`} checked={selected}/>
                    <div className={reservationsLeft < reservationAmount ? `p-2 date-full w-100` : `p-2 date w-100`}>
                        <p className={'text-end m-0 fs-6'}>{day} <br/> {month}</p> <br/>
                        <p className={'text-start m-0 lead fs-6 text-muted'}>{reservationDate.reservationAmount}/ {reservationDate.reservationLimit}</p>
                    </div>
                </label>
            </td>

        )
    }
    return (
        <td className={`p-0 border text-muted bg-light calendar-even-width`}>
            <div className={`p-2 date`}>
                <p className={'text-end m-0 lead fs-6'}>{day} <br/> {month}</p>
            </div>
        </td>
    )
}

export default CalendarField;

CalendarField.propTypes = {
    isClickable: PropTypes.bool,
    dateString: PropTypes.string,
    monthList: PropTypes.array
}