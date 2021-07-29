import React, {useEffect, useState} from "react"
import EventLabel from "../EventLabel";
import OpeningDateModal from "../OpeningDateModal";


const AdminCalendarField = ({date, monthArray, month, openingDate, updateDate}) => {


    const [monthShort, setMonthShort] = useState('')
    const [dateNumber, setDateNumber] = useState(date.getDate())
    const [monthNumber, setMonthNumber] = useState(date.getMonth())
    const [showModal, setShowModal] = useState(false)
    const [dateString, setDateString] = useState("")

    useEffect(() => {
        const dateNr = date.getDate()
        setDateNumber(dateNr)
    }, [date])

    useEffect(() => {
        const monthNr = date.getMonth()
        setMonthNumber(monthNr)
    }, [date])

    useEffect(() => {
        const charArray = [...monthArray[monthNumber].monthName]
        if (charArray[2] !== charArray[1]) {
            setMonthShort(charArray[0] + charArray[1] + charArray[2])
        } else {
            setMonthShort(charArray[0] + charArray[1] + charArray[3])
        }
    }, [monthNumber])

    useEffect(() => {
        setDateString(`${date.getFullYear()}-${monthNumber + 1 < 10 ? `0${monthNumber + 1}` : monthNumber + 1}-` +
            `${dateNumber < 10 ? `0${dateNumber}` : dateNumber}`)
    }, [date, dateNumber, monthNumber])

    return (monthArray[monthNumber] ?
        <>
            <div
                className={monthNumber === month ? "border calendar-even-width d-flex justify-content-start flex-column p-0"
                    : "border calendar-even-width bg-light text-muted p-0"}>
                {monthNumber !== month ?
                    <p className={`m-0`}>{`${dateNumber} \n ${monthShort}`}</p>
                    : <p className={"text-center m-0"}>{`${dateNumber}`}</p>
                }
                {openingDate && openingDate[0] ?
                    openingDate.map((openingdate, index) =>
                        <EventLabel key={index} openDate={openingdate} updateDate={updateDate} date={date}
                                    dateNumber={dateNumber}
                                    monthShort={monthShort}/>
                    ) : null}
                    <div className="flex-fill" onClick={() => setShowModal(true)}>

                    </div>
            </div>
            <OpeningDateModal updateDate={updateDate} openDate={null}
                              title={`Nieuwe openingsdag ${dateNumber} ${monthShort} ${date.getFullYear()} aanmaken`}
                              showModal={showModal} setShowModal={setShowModal}
                              date={dateString}/>
            </>
            : null
            )
            }

export default AdminCalendarField;