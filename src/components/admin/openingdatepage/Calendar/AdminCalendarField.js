import React, {useState} from "react"

const AdminCalendarField = ({date, monthArray}) => {



    return ( monthArray[date.getMonth()] && monthArray[date.getMonth()].monthName ?
        <div className="border calendar-even-width">
             <p>{`${date.getDate()} ${monthArray[date.getMonth()].monthName}`}</p>
        </div> : null
    )
}

export default AdminCalendarField;