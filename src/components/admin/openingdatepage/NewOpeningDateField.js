import {Button, Card, Modal, Spinner} from "react-bootstrap";
import {FaCalendar, FaClock, FaPlus} from "react-icons/all";
import {useState} from "react";
import ReservationInput from "./reservationInput";

const NewOpeningDateField = () => {

    const [show, setShow] = useState(false)
    const [dateError, setDateError] = useState(false)
    const [capacity, setCapacity] = useState("0")
    const [openingDate, setOpeningDate] = useState("")
    const [openingHour, setOpeningHour] = useState("")
    const [closingHour, setClosingHour] = useState("")
    const [activeDate, setActiveDate] = useState(true)


    const handleClose = () => {
        console.log("placeholder saving item")
        setShow(false)
    }

    return (
        <>
            <Card className={"border-success col-12 col-md-5 col-lg-4 col-xl-3 mx-auto my-3 p-0"}
                  style={{minHeight: "23.3rem", cursor:"pointer"}} onClick={() => setShow(true)}>
                <Card.Header className={"border-success"}>
                    <Card.Title>
                        <p className="lead m-0 text-success text-center">Nieuwe datum Toevoegen</p>
                    </Card.Title>
                </Card.Header>
                <Card.Body className={"d-flex justify-content-center align-items-center"}>
                    <FaPlus fontSize={46} className={"text-success"}/>
                </Card.Body>
            </Card>

            <Modal show={show} size="lg"
                   aria-labelledby="contained-modal-title-vcenter"
                   centered={true}>
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <h2 className={`display-6 my-3 text-center`}>Nieuwe reservatie datum</h2>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className={"px-0"}>
                    <div className={`container-fluid mx-0 px-0 d-flex flex-column align-items-center mb-3`}>
                        {dateError ?
                            <p className="lead text-danger m-1">Deze dag is al verlopen en kan niet op actief gezet
                                worden</p> : null}
                        <div className="col-12 mb-3 border-bottom">
                            <div className="form-check form-switch ms-2">
                                <input type={"checkbox"} className={"form-check-input keep-auto my-2 me-3"} id={"activeDateCheck"}/>
                                <label htmlFor="activeDateCheck" className={"form-check-label lead"}>
                                    Actieve Reservatie
                                </label>
                            </div>
                        </div>
                        <div className="col-12 d-flex justify-content-between px-3">
                            <p className={'lead fs-5 m-0'}>aantal reservaties:</p>
                            <div className={'d-flex flex-nowrap col-6 justify-content-end'}>
                                <p className={'lead fs-5 m-0 me-2'}>0 /
                                </p>
                                <input type="number" min={"0"} value={capacity} className={'form-control w-50 text-center p-1'}
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
                    <Button variant="success" onClick={() => handleClose()}>
                        Save
                    </Button>
                    <Button variant={"secondary"} onClick={() => setShow(false)}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default NewOpeningDateField;