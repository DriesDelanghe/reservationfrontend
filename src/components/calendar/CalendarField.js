import PropTypes from 'prop-types'

const CalendarField = ({ dateString, isClickable, monthList, reservationDate, toggleDate, selectedDates }) => {
    const dateDate = new Date(dateString);
    const day = dateDate.getDate()
    const month = monthList[dateDate.getMonth()] ? monthList[dateDate.getMonth()].monthName : `jan`;
    const id = `${day}${month}`

    if (isClickable){
        return (
            <td className={'border p-0'} onChange={() => toggleDate(reservationDate.id)}>
                <label htmlFor={id} className={'w-100 h-100 p-0'}>
                    <input type="checkbox" id={id} defaultChecked={!!selectedDates.find(selected => new Date(selected.openingDate).getTime() === new Date(dateString).getTime())}/>
                    <div className={`p-2 date`}>
                        <span>{day} <br/> {month}</span>
                    </div>
                </label>
            </td>
        )
    }
    return (
        <td className={`p-0 border text-muted bg-light`}>
            <div className={`p-2 date`}>
                <span>{day} <br/> {month}</span>
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