import React, {useEffect, useState} from "react";
import AdminCalendarRow from "./AdminCalendarRow";
import {FaCalendar, FaCalendarDay, FaChevronLeft, FaChevronRight} from "react-icons/all";
import {Button} from "react-bootstrap";


const AdminCalendar = ({openingDateArray, updateDate}) => {

    const [month, setMonth] = useState(new Date().getMonth())
    const [year, setYear] = useState(new Date().getFullYear())
    const [monthArray, setMonthArray] = useState([])
    const [periodMatrix, setPeriodMatrix] = useState([[]])

    useEffect(() => {
        fetchMonthArray().then(data => {
                setMonthArray([...data])
            }
        )
    }, [])

    const fetchMonthArray = async () => {
        const res = await fetch("/data/month")
        return await res.json()
    }

    useEffect(() => {
        const firstEntry = new Date(`${year}-${month + 1}-1`)
        if (firstEntry.getDay() === 0) firstEntry.setDate(firstEntry.getDate() - 6)
        if (firstEntry.getDay() !== 1) firstEntry.setDate(firstEntry.getDate() - (firstEntry.getDay() - 1))
        let date = new Date(firstEntry.getTime())
        date.setHours(0,0,0,0)
        let dateMatrix = []
        while ((date.getMonth() <= month || ((month === 11 || month === 0) && date.getMonth() === 11)) && date.getFullYear() <= year) {
            let dateRow = []
            while (dateRow.length < 7) {
                dateRow = [...dateRow, new Date(date.getTime())]
                date.setDate(date.getDate() + 1)
            }
            dateMatrix = [...dateMatrix, [...dateRow]]
        }
        setPeriodMatrix([...dateMatrix])

    }, [month, year])

    const addMonth = () => {
        if (month < 11) {
            setMonth(month + 1)
            return
        }
        setYear(year + 1)
        setMonth(0)
    }

    const subtractMonth = () => {
        if (month > 0) {
            setMonth(month - 1)
            return
        }
        setYear(year - 1)
        setMonth(11)
    }

    const resetCalendar = () => {
        setMonth(new Date().getMonth())
        setYear(new Date().getFullYear())
    }

    return (
        monthArray[month] ?
            <div className="container-fluid">
                <div className="w-100 d-flex justify-content-end">
                    <Button variant={"light"} onClick={() => resetCalendar()}>
                        <FaCalendarDay fontSize={24}/>
                    </Button>
                </div>
                    <h3 className="lead fs-5 fw-normal">{year}</h3>
                <div className={`container-fluid border mb-5 p-0 m-0`}>
                    <div className="w-100 d-flex justify-content-center align-items-baseline my-2">
                        <div className={"w-100 d-flex justify-content-start ps-5"} onClick={() => subtractMonth()}>
                            <FaChevronLeft/>
                        </div>
                        <h3 className="display-6 text-center">{monthArray[month].monthName}</h3>
                        <div className="w-100 d-flex justify-content-end pe-5" onClick={() => addMonth()}>
                            <FaChevronRight/>
                        </div>
                    </div>
                    <div className="container-fluid row flex-nowrap m-0 p-0 text-center fw-bold">
                        <div className="border calendar-even-width">Ma</div>
                        <div className="border calendar-even-width">Di</div>
                        <div className="border calendar-even-width">Wo</div>
                        <div className="border calendar-even-width">Do</div>
                        <div className="border calendar-even-width">Vr</div>
                        <div className="border calendar-even-width">Za</div>
                        <div className="border calendar-even-width">Zo</div>
                    </div>
                    <div className="container-fluid m-0 p-0">
                        {
                            periodMatrix.map((array, index) =>
                                <AdminCalendarRow updateDate={updateDate} array={array} key={`row` + index} monthArray={monthArray}
                                                  rowNumber={index} month={month} openingDateArray={openingDateArray}/>)
                        }
                    </div>
                </div>
            </div>
            : null
    )
}

export default AdminCalendar;