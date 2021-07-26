import SelectedDateField from "./SelectedDateField";
import React from "react";

const DateOverview = ({selectedDates, personList, toggleDate, monthList }) => {

    return(
        selectedDates.map((date, index) => <SelectedDateField key={index} monthList={monthList} selectedDate={date} toggleDate={toggleDate} personList={personList}/> )
    )

}

export default DateOverview;