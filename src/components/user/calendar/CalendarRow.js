import PropTypes from 'prop-types'
import CalendarField from "./CalendarField";

const CalendarRow = ({dates, referenceList, monthList, toggleDate, selectedDates, personList }) => {

    return (
        <tr>
            {dates.map((date, index) => <CalendarField key={index} monthList={monthList} dateString={date}
                isClickable={!!referenceList.find(object => new Date(object.openingDate).getTime() === new Date(date).getTime())}
                reservationDate={referenceList.find(object => new Date(object.openingDate).getTime() === new Date(date).getTime())}
                toggleDate={toggleDate} selectedDates={selectedDates} personList={personList}/>)}
        </tr>
    )
};

export default CalendarRow;

CalendarRow.propTypes = {
    referenceList: PropTypes.array,
    monthList: PropTypes.array,
    dates: PropTypes.array,
    toggleDate: PropTypes.func
}