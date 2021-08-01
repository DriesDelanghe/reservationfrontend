import React, {useCallback, useEffect, useState} from "react";
import { FaChevronLeft, FaChevronRight} from "react-icons/all";
import CalendarRow from "./CalendarRow";


const CalendarFrame = ( {monthNamesFetched, reservationDates, toggleDate, selectedDates, personList}) => {

    const [monthPeriodMatrix, setMonthPeriodMatrix] = useState([[[]]])
    const [index, setIndex] = useState(0)
    const [monthNames, setMonthNames] = useState([])
    const [monthName, setMonthName] = useState('')
    const [year, setYear] = useState('')

    useEffect(() => {
        setMonthNames([...monthNamesFetched])
    }, [monthNamesFetched])

    useEffect(() => {
        if (monthPeriodMatrix[index] && monthPeriodMatrix[index][1]){
            setYear(new Date(monthPeriodMatrix[index][1][0]).getFullYear() + "")
        }
    }, [monthPeriodMatrix])

    useEffect(() => {
        if (monthPeriodMatrix[index] && monthPeriodMatrix[index][1] && monthNames[0]){
            setMonthName(monthNames[new Date(monthPeriodMatrix[index][1][0]).getMonth()].monthName)
            return
        }
        setMonthName("Loading")
    }, [monthPeriodMatrix, monthNames, index])

    useEffect(() => {
        const fetchMatrix = async () =>  {
            const res = await fetch("/data/calendar/period")
            return await res.json()
        }

        fetchMatrix().then(data => setMonthPeriodMatrix(data))
    })

    const nextIndex = () => {
        if (index + 1 < monthPeriodMatrix.length){
            setIndex(index + 1)
            return
        }
        setIndex(0)
    }

    const prevIndex = () => {
        if (index > 0){
            setIndex(index -1)
            return
        }
        setIndex(monthPeriodMatrix.length - 1)
    }


    return (
            <div className="container-fluid">
                <h3 className="lead fs-5 fw-normal">{year}</h3>
                <div className={`container-fluid border mb-5 p-0 m-0`}>
                    <div className="w-100 d-flex justify-content-center align-items-baseline my-2">
                        <div className={"w-100 d-flex justify-content-start ps-5"} onClick={() => prevIndex()}>
                            <FaChevronLeft/>
                        </div>
                        <h3 className="display-6 text-center">{monthName}</h3>
                        <div className="w-100 d-flex justify-content-end pe-5" onClick={() => nextIndex()}>
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
                            monthPeriodMatrix[index].map((array, index) =>
                                <CalendarRow key={`row${index}`} dates={array} monthList={monthNames} personList={personList}
                                             referenceList={reservationDates} toggleDate={toggleDate} selectedDates={selectedDates}
                                monthNumber={monthNames.find(object => object.monthName === monthName)}/>
                                )
                        }
                    </div>
                </div>
            </div>
    )
}

export default CalendarFrame