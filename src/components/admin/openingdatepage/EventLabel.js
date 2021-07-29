import React, {useEffect, useState} from "react";
import OpeningDateModal from "./OpeningDateModal";


const EventLabel = ({openDate, date, dateNumber, monthShort, setDateOpening,
                    setOpenDate, setShowModal, setTitle}) => {

    const [openingDate, setOpeningDate] = useState()

    useEffect(() => {
        setOpeningDate(openDate)
    }, [openDate])


    const formatDate = () => {
        return `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}-` +
            `${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`
    }

    const openModal = () => {
        setTitle(`Nieuwe openingsdag ${dateNumber} ${monthShort} ${date.getFullYear()} aanmaken`)
        setOpenDate(null)
        const dateString = formatDate()
        setDateOpening(dateString)
        setShowModal(true)
        setOpenDate(openDate)
    }

    return (openingDate ?
                <div
                    className={`w-100 alert ${openingDate.activeDate ? "alert-primary" : "alert-secondary"} m-0 h-auto rounded-2 p-0 pt-1`}
                    onClick={() => openModal()}>
                    <p className={`m-0 p-0 text-center text-truncate`}>
                        <small>
                            {openingDate.eventName}
                        </small>
                    </p>
                </div>
            : null
    )
}

export default EventLabel;