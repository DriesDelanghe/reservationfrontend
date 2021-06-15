import PropTypes from 'prop-types'
import CalendarField from "./CalendarField";

const CalendarRow = ({ dates, referenceList, monthList }) => {

    console.log(dates)

    return (
        <tr className={'text-end'}>
            {dates.map((date, index) => <CalendarField key={index} monthList={monthList} dateString={date} isClickable={
                !!referenceList.find(object => new Date(object.openingDate).getTime() === new Date(date).getTime())
            } />)}
        </tr>
    )
};

export default CalendarRow;

CalendarRow.propTypes = {
    referenceList: PropTypes.array
}