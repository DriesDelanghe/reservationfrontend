import React, {useEffect, useState} from "react";
import AdminCalendarRow from "./AdminCalendarRow";


const AdminCalendar = ({}) => {

    const [month, setMonth] = useState(new Date().getMonth())
    const [year, setYear] = useState(new Date().getFullYear())
    const [monthArray, setMonthArray] = useState([])
    const [periodMatrix, setPeriodMatrix] = useState([[]])

    useEffect(() => {
        fetchMonthArray().then( data => {
                console.log('monthArray: ', JSON.stringify(data))
                setMonthArray([...data])
            }
        )
    }, [])

    const fetchMonthArray = async() =>{
        const res = await fetch("/data/month")
        return await res.json()
    }

    useEffect(() => {
        const firstEntry = new Date(`${year}-${month + 1}-1`)
        if (firstEntry.getDay() !== 1) firstEntry.setDate(firstEntry.getDate() - (firstEntry.getDate() + 1))
        const date = new Date(firstEntry.getTime())
        console.log(date + '')
        let dateMatrix = []
        while (date.getMonth() <= month) {
            let dateRow = []
            while (dateRow.length < 7) {
                dateRow = [...dateRow, new Date(date.getTime())]
                date.setDate(date.getDate() + 1)
            }
            dateMatrix = [...dateMatrix, [...dateRow]]
        }
        setPeriodMatrix([...dateMatrix])

    }, [month])

    return (
        periodMatrix.map((array, index) =>
         <AdminCalendarRow array={array} key={`row`+index} monthArray={monthArray} rowNumber={index}/> )
    )
}

export default AdminCalendar;