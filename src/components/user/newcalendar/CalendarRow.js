import PropTypes from 'prop-types'
import CalendarField from "./CalendarField";
import React from "react";

const CalendarRow = ({dates, referenceList, monthList, toggleDate, selectedDates, personList, monthNumber }) => {

    return (
        <div className={'container-fluid row flex-nowrap m-0 p-0 fixed-height'}>
            {dates.map((date, index) => <CalendarField key={index} monthList={monthList} dateString={date}
                reservationDate={referenceList.find(object => new Date(object.openingDate).getTime() === new Date(date).getTime())}
                toggleDate={toggleDate} selectedDates={selectedDates} personList={personList} monthNumber={monthNumber}/>)}
        </div>
    )
};

export default CalendarRow;

CalendarRow.propTypes = {
    referenceList: PropTypes.array,
    monthList: PropTypes.array,
    dates: PropTypes.array,
    toggleDate: PropTypes.func
}