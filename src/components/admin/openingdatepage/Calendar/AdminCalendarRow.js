import React, {useEffect, useState} from "react"
import AdminCalendarField from "./AdminCalendarField";


const AdminCalendarRow = ({monthArray, array, rowNumber}) => {

    const [dateArray, setDateArray] = useState([])

    useEffect(() => {
        setDateArray([...array])
    }, [])

    return (
        <div className="container-fluid row flex-nowrap">
            {dateArray[0] ? dateArray.map((date, index) =>
                <AdminCalendarField key={`${rowNumber}-${index}`} date={date} monthArray={monthArray}/>
            ) : null}
        </div>
    )
}
export default AdminCalendarRow