import Calendar from "./Calendar";
import {useState} from "react";


const CalendarView = ({monthPeriodMatrix, monthNames, personList, reservationDates, selectedDates, toggleDate}) => {

    const [index, setIndex] = useState(0)

    const nextMonth = () => {
        if (index + 1 < monthPeriodMatrix.length){
            setIndex(index + 1)
            return
        }
        setIndex(0)
    }

    const previousMonth = () => {
        if (index > 0 ){
            setIndex(index - 1)
            return
        }
        setIndex(monthPeriodMatrix.length - 1)
    }

    return (
        monthPeriodMatrix && monthPeriodMatrix[index] ?
        <Calendar monthNames={monthNames} period={monthPeriodMatrix[index]} personList={personList}
                  reservationDates={reservationDates} selectedDates={selectedDates} toggleDate={toggleDate}
                  />
                  :null
    )
}

export default CalendarView