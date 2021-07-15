import {useEffect, useState} from "react";
import {Card, Button} from "react-bootstrap";
import { FaBox, FaBoxOpen, FaCalendar, FaClock, FaTrash } from "react-icons/all";
import ReservationInput from "./reservationInput";

const OpeningDateField = ({dateObject, updateDate}) => {

    const [capacity, setCapacity] = useState(dateObject.reservationLimit)
    const [capacityError, setCapacityError] = useState(false)
    const [dateError, setDateError] = useState(false)
    const [pastDate, setPastDate] = useState(false)

    useEffect(() => {
        let dateToday = new Date();
        const openingDate = new Date(dateObject.openingDate)
        dateToday.setHours(openingDate.getHours())
        if (dateToday.getTime() < openingDate.getTime()){
            setPastDate(true)
        }
    })

    useEffect(() => {
        const dateFade = async () => {
                setTimeout(() => {
                    console.log("setting dateError to false")
                    setDateError(false)
                }, 4000)

        }
        if (dateError){
            console.log("removing dateError after 1s")
            dateFade()
        }

    }, [dateError])

    useEffect(() => {
        updateReservationLimit(capacity)
    }, [capacity])

    const updateReservationLimit = (limit) => {
        if (limit < dateObject.reservationAmount) {
            setCapacityError(true)
            return
        }
        setCapacityError(false)
        updateDate({...dateObject, reservationLimit: limit})
    }

    const updateActiveDate = (active) => {
        if (active !== dateObject.activeDate && !dateObject.activeDate) {
            const openingsDate = new Date(dateObject.openingDate)
            const date = new Date()
            date.setHours(2, 0, 0, 0)
            if (openingsDate.getTime() < date.getTime()) {
                setDateError(true)
                return
            }
        }
        setDateError(false)
        updateDate({...dateObject, activeDate: active})
    }

    const updateOpeningHour = (openingHour) => {
        updateDate({...dateObject, openingHour: openingHour})
    }
    const updateClosingHour = (closingHour) => {
        updateDate({...dateObject, closingHour: closingHour})
    }
    const updateOpeningDate = (openingDate) => {
        updateDate({...dateObject, openingDate: openingDate})
    }

    const removeDate = (openingDate) => {
        updateDate({...dateObject, removed:true})
    }

    return (
        <Card className={"col-12 col-md-5 col-lg-4 col-xl-3 mx-auto my-3 p-0"}>
            <Card.Header>
                <Card.Title>
                    <div className="d-flex justify-content-between align-items-center">
                        <p className="lead fs-5">Reservatie dag: <br/> {dateObject.openingDate}</p>
                        <div className="d-flex justify-content-end gap-2">
                        {pastDate ? <Button variant={dateObject.activeDate ? "secondary" : "secondary"}
                                 onClick={() => updateActiveDate(!dateObject.activeDate)}>
                            {dateObject.activeDate ? <FaBox fontSize={16}/> : <FaBoxOpen fontSize={16}/>}
                        </Button> : null}
                        <Button variant={"danger"} onClick={() => removeDate(dateObject)}>
                            <FaTrash fontSize={16}/>
                        </Button>
                        </div>
                    </div>
                </Card.Title>
            </Card.Header>
            <Card.Body className={'d-flex justify-content-start gap-1 flex-wrap'}>
                {capacityError ?
                    <p className="lead text-danger m-1">Reservatie limiet mag niet kleiner zijn dan het huidig aantal
                        reservaties</p> : null}
                {dateError ?
                    <p className="lead text-danger m-1">Deze dag is al verlopen en kan niet op actief gezet
                        worden</p> : null}
                <div className="col-12 d-flex justify-content-between ms-auto me-0">
                    <p className={'lead fs-5 m-0'}>aantal reservaties:</p>
                    <div className={'d-flex flex-nowrap col-6 justify-content-end'}>
                        <p className={'lead fs-5 m-0 me-2'}>{dateObject.reservationAmount} /
                        </p>
                        <input type="text" value={capacity} className={'form-control w-50 text-center p-1'}
                               onChange={e => setCapacity(e.target.value)}/>
                    </div>
                </div>
                <div className="col-12">
                    <ReservationInput value={dateObject.openingDate} type={"date"} text={"Openingsdag:"}
                                      FaSymbol={<FaCalendar/>}
                                      setter={updateOpeningDate}/>
                </div>
                <div className="row">
                    <ReservationInput className={'col-6'} value={dateObject.openingHour} setter={updateOpeningHour}
                                      FaSymbol={<FaClock/>}
                                      text={"Openingsuur:"} type={"time"}/>
                    <ReservationInput className={'col-6'} value={dateObject.closingHour} setter={updateClosingHour}
                                      FaSymbol={<FaClock/>}
                                      text={"Sluitingsuur:"} type={"time"}/>
                </div>
            </Card.Body>
        </Card>
    )

}

export default OpeningDateField;