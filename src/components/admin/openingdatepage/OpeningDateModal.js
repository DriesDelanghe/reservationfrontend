import React, {useEffect, useState} from "react";
import {Button, Modal} from "react-bootstrap";
import ReservationInput from "./reservationInput";
import {FaCalendar, FaClock, FaTrash} from "react-icons/all";


const OpeningDateModal = ({openDate, title, updateDate, showModal, setShowModal, date}) => {

    const [show, setShow] = useState(showModal || false)
    const [capacity, setCapacity] = useState("0")
    const [openingDate, setOpeningDate] = useState(date)
    const [openingHour, setOpeningHour] = useState("")
    const [closingHour, setClosingHour] = useState("")
    const [activeDate, setActiveDate] = useState(true)
    const [eventName, setEventName] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
        if (openDate) {
            setOpeningDate(openDate)
        }
    }, [openDate])

    useEffect(() => {
        setShow(showModal)
    }, [showModal])

    useEffect(() => {
        if (openDate) {
            setCapacity(openDate.reservationLimit)
        }
    }, [openDate])

    useEffect(() => {
        if (openDate) {
            setOpeningHour(openDate.openingHour)
        }
    }, [openDate])

    useEffect(() => {
        if (openDate) {
            setClosingHour(openDate.closingHour)
        }
    }, [openDate])

    useEffect(() => {
        if (openDate) {
            setActiveDate(openDate.activeDate)
        }
    }, [openDate])

    useEffect(() => {
        if (openDate) {
            setEventName(openDate.eventName)
        }
    }, [openDate])

    useEffect(() => {
        setOpeningDate(date)
    }, [date])

    const handleClose = () => {
        if (capacity > 0 && openingDate && openingHour && closingHour) {
            setErrorMessage("")
            setShowModal(false)
            const dateObject = constructObject()
            updateDate(dateObject)
        } else {
            setErrorMessage("Alle velden moeten ingevuld zijn")
        }
    }

    const handleRemove = () => {
        const dateObject = constructObject();
        dateObject.removed = true
        setShowModal(false)
        updateDate(dateObject)
    }

    const constructObject = () => {
        const id = openDate ? openDate.id : null
        return {
            id: id,
            openingDate: openingDate,
            openingHour: openingHour,
            closingHour: closingHour,
            reservationLimit: capacity,
            reservationAmount: openingDate.reservationAmount || 0,
            activeDate: activeDate,
            eventName: eventName,
            removed: false
        }
    }

    return (
        <Modal show={show} size="lg"
               aria-labelledby="contained-modal-title-vcenter"
               centered={true} onHide={() => setShowModal(false)}>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    <h2 className={`display-6 my-3 text-center`}>{title}</h2>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className={`container-fluid mx-0 px-0 d-flex flex-column align-items-center mb-3`}>
                    <div className="col-12 mb-3 border-bottom">
                        <div className="form-check form-switch ms-2">
                            <input type={"checkbox"} className={"form-check-input keep-auto my-2 me-3"}
                                   id={"activeDateCheck"} onChange={e => setActiveDate(e.currentTarget.checked)}
                                   checked={activeDate}/>
                            <label htmlFor="activeDateCheck" className={"form-check-label lead"}>
                                Actieve Reservatie
                            </label>
                        </div>
                    </div>
                    {errorMessage ?
                        <div className="w-100 text-left">
                            <p className="text-danger lead">{errorMessage}</p>
                        </div>
                        : null
                    }
                    <div className="col-12 d-flex justify-content-start">
                        <ReservationInput setter={setEventName} value={eventName} text={"naam evenement:"}/>
                    </div>
                    <div className="col-12 d-flex justify-content-between px-3">
                        <p className={'lead fs-5 m-0'}>aantal reservaties:</p>
                        <div className={'d-flex flex-nowrap col-6 justify-content-end'}>
                            <p className={'lead fs-5 m-0 me-2'}>0 /
                            </p>
                            <input type="number" min={"0"} value={capacity}
                                   className={'form-control w-50 text-center p-1'}
                                   onChange={e => setCapacity(e.target.value)}/>
                        </div>
                    </div>
                    <div className="col-12 d-flex justify-content-center">
                        <ReservationInput value={openingDate} type={"date"} text={"Openingsdag:"}
                                          FaSymbol={<FaCalendar/>}
                                          setter={setOpeningDate}/>
                    </div>
                    <div className="row">
                        <ReservationInput className={'col-6'} value={openingHour} setter={setOpeningHour}
                                          FaSymbol={<FaClock/>}
                                          text={"Openingsuur:"} type={"time"}/>
                        <ReservationInput className={'col-6'} value={closingHour} setter={setClosingHour}
                                          FaSymbol={<FaClock/>}
                                          text={"Sluitingsuur:"} type={"time"}/>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                {openDate && openDate.id  ?
                <Button variant={"danger"} className={"me-auto ms-0"} onClick={() => handleRemove()}>
                    Remove
                </Button>
                    : null
                }
                <Button variant="success" onClick={() => handleClose()}>
                    Save
                </Button>
                <Button variant={"secondary"} onClick={() => setShowModal(false)}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default OpeningDateModal;