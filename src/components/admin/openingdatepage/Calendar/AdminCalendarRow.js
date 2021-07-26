import React, {useEffect, useState} from "react"
import AdminCalendarField from "./AdminCalendarField";


const AdminCalendarRow = ({monthArray, array, rowNumber, month, openingDateArray}) => {

    const [dateArray, setDateArray] = useState([])

    useEffect(() => {
        setDateArray([...array])
    }, [array, month])

    return (
        <div className="container-fluid row flex-nowrap m-0 p-0">
            {dateArray[0] ? dateArray.map((date, index) =>
                <AdminCalendarField key={`${rowNumber}-${index}`} date={date} monthArray={monthArray} month={month}
                openingDate={openingDateArray.find(dateObject => new Date(dateObject.openingDate).getTime() === date.getTime())}/>
            ) : null}
        </div>
    )
}
export default AdminCalendarRow