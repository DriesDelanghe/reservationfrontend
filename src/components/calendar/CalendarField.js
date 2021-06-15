import PropTypes from 'prop-types'

const CalendarField = ({ dateString, isClickable, monthList}) => {

    console.log(dateString)

    const dateDate = new Date(dateString);
    const day = dateDate.getDate()
    const month = monthList[dateDate.getMonth()].monthName;
    const id = `${day}${month}`

    if (isClickable){
        return (
            <td className={'border p-0'}>
                <label htmlFor={id} className={'w-100 h-100 p-0'}>
                    <input type="checkbox" id={id}/>
                    <div className={`p-2`}>
                        <span>{day} <br/> {month}</span>
                    </div>
                </label>
            </td>
        )
    }
    return (
        <td className={`p-0 border text-muted bg-light`}>
            <div className={`p-2`}>
                <span>{dateDate.getDate()} <br/> {monthList[dateDate.getMonth()].monthName}</span>
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