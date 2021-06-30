import PropTypes from 'prop-types'
import {useEffect, useState} from "react";

const CalendarField = ({ dateString, isClickable, monthList, reservationDate, toggleDate, selectedDates, personList }) => {

    const dateDate = new Date(dateString);
    const day = dateDate.getDate()
    const month = monthList[dateDate.getMonth()] ? monthList[dateDate.getMonth()].monthName : `jan`;
    const id = `${day}${month}`

    const [selected, setSelected] = useState();

    useEffect(() => {
        if (!!selectedDates.find(selected => new Date(selected.openingDate).getTime() === new Date(dateString).getTime())){
            setSelected(true)
            return
        }
        setSelected(false)
    }, [selectedDates])

    if (isClickable){

        const reservationsLeft = reservationDate.reservationLimit - reservationDate.reservationAmount;
        const reservationAmount = personList.length;

        return (
            <td className={'border p-0'} onChange={() => toggleDate(reservationDate.id)}>
                <label htmlFor={id} className={'w-100 h-100 p-0'}>
                    <input type="checkbox" id={id} checked={selected}/>
                    <div className={reservationsLeft < reservationAmount ? `p-2 date-full w-100` : `p-2 date w-100`}>
                        <p className={'text-end m-0 fs-6'}>{day} <br/> {month}</p> <br/>
                        <p className={'text-start m-0 lead fs-6 text-muted'}>{reservationDate.reservationAmount} / {reservationDate.reservationLimit}</p>
                    </div>
                </label>
            </td>
        )
    }
    return (
        <td className={`p-0 border text-muted bg-light`}>
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