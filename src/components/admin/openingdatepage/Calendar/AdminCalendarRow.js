import React, {useEffect, useState} from "react"
import AdminCalendarField from "./AdminCalendarField";


const AdminCalendarRow = ({monthArray, array, rowNumber, month, openingDateArray}) => {

    const [dateArray, setDateArray] = useState([])

    useEffect(() => {
        setDateArray([...array])
    }, [array, month])

    return (
        <div className="container-fluid row flex-nowrap m-0 p-0 fixed-height">
            {dateArray[0] ? dateArray.map((date, index) =>
                <AdminCalendarField key={`${rowNumber}-${index}`} date={date} monthArray={monthArray} month={month}
                openingDate={openingDateArray.filter(dateObject => new Date(dateObject.openingDate).getTime() >= new Date(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`).getTime() &&
                    new Date(dateObject.openingDate).getTime() <= new Date(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`).getTime()
                )}/>
            ) : null}
        </div>
    )
}
export default AdminCalendarRow