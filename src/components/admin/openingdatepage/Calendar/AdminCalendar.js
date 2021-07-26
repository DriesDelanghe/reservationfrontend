import {useEffect, useState} from "react";


const AdminCalendar = () => {

    const [month, setMonth] = useState(new Date().getMonth())
    const [year, setYear] = useState(new Date().getFullYear())
    const [periodMatrix, setPeriodMatrix] = useState([[]])

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
        <div className="container-fluid row">
            {array.map((date, index) => `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}  `)}
        </div>)
    )
}

export default AdminCalendar;