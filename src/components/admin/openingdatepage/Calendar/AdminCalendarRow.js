import React, {useEffect, useState} from "react"
import AdminCalendarField from "./AdminCalendarField";


const AdminCalendarRow = ({monthArray, array, rowNumber, month, openingDateArray, updateDate}) => {

    const [dateArray, setDateArray] = useState([])

    useEffect(() => {
        setDateArray([...array])
    }, [array, month])

    return (
        <div className="container-fluid row flex-nowrap m-0 p-0 fixed-height">
            {dateArray[0] ? dateArray.map((date, index) =>
                <AdminCalendarField key={`${rowNumber}-${index}`} date={date} monthArray={monthArray} month={month}
                openingDate={openingDateArray.filter(dateObject => {
                    let newDate = new Date(dateObject.openingDate)
                    newDate.setHours(0,0,0,0)
                        return newDate.getTime() === date.getTime()
                    }
                )} updateDate={updateDate} />
            ) : null}
        </div>
    )
}
export default AdminCalendarRow