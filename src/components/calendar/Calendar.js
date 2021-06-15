import PropTypes from 'prop-types'
import CalendarRow from "./CalendarRow";

const Calendar = ({reservationDates, monthNames, period}) => {

    return (
        <div className={`container mx-auto mt-5 p-2 border shadow-sm rounded-2`}>
            <table className={`table table-bordered`}>
                <thead>
                <tr className={`text-center`}>
                    <th scope={`col`} className={`p-0`}>Ma</th>
                    <th scope={`col`} className={`p-0`}>Di</th>
                    <th scope={`col`} className={`p-0`}>Wo</th>
                    <th scope={`col`} className={`p-0`}>Do</th>
                    <th scope={`col`} className={`p-0`}>Vr</th>
                    <th scope={`col`} className={`p-0`}>Za</th>
                    <th scope={`col`} className={`p-0`}>Zo</th>
                </tr>
                </thead>
                <tbody>
                {period.map((array, index) => <CalendarRow key={`row${index}`} dates={array} monthList={monthNames}
                                                           referenceList={reservationDates}/>)}
                </tbody>
            </table>
        </div>
    )
}

export default Calendar;

Calendar.propTypes = {
    reservationDates: PropTypes.array,
    monthNames: PropTypes.array
}