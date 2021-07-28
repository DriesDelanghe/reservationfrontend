import React, {useEffect, useState} from "react";
import OpeningDateModal from "./OpeningDateModal";


const EventLabel = ({openDate, date, dateNumber, monthShort, updateDate, setShowModalField}) => {

    const [openingDate, setOpeningDate] = useState()
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        setOpeningDate(openDate)
    }, [openDate])


    const formatDate = () => {
        return `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}-` +
            `${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`
    }

    return (openingDate ?
            <>
                <div
                    className={`w-100 alert ${openingDate.activeDate ? "alert-primary" : "alert-secondary"} m-0 h-auto rounded-2 text-truncate pt-1`}
                    onClick={() => setShowModal(true)}>
                    <p className={`small m-0 p-0`}>
                            {openingDate.eventName}
                    </p>
                </div>
                <OpeningDateModal updateDate={updateDate} openDate={openingDate} showModal={showModal}
                                  title={openingDate ?
                                      `Openingsdag ${dateNumber} ${monthShort} ${date.getFullYear()} aanpassen` :
                                      `Nieuwe openingsdag ${dateNumber} ${monthShort} ${date.getFullYear()} aanmaken`}
                                  setShowModal={setShowModal} date={() => formatDate()}/>
            </>
            : null
    )
}

export default EventLabel;