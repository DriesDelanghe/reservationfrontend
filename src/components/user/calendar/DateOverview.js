import SelectedDateField from "./SelectedDateField";

const DateOverview = ({selectedDates, personList, toggleDate }) => {

    return(
        selectedDates.map((date, index) => <SelectedDateField key={index} selectedDate={date} toggleDate={toggleDate} personList={personList}/> )
    )

}

export default DateOverview;