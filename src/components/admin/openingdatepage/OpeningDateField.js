import {useEffect, useState} from "react";
import {Card, Button} from "react-bootstrap";
import { FaBox, FaBoxOpen, FaCalendar, FaClock} from "react-icons/all";
import ReservationInput from "./reservationInput";

const OpeningDateField = ({dateObject, updateDate}) => {

    const [referenceObject, setReferenceObject] = useState()
    const [openHour, setOpenHour] = useState()
    const [closeHour, setCloseHour] = useState()
    const [openingDate, setOpeningDate] = useState()
    const [activeDate, setActiveDate] = useState()
    const [capacity, setCapacity] = useState()
    const [capacityError, setCapacityError] = useState(false)
    const [dateError, setDateError] = useState(false)

    useEffect(() => {
        if (dateObject.openingHour) {
            const timeList = dateObject.openingHour.split(":");
            let hour;
            Number(timeList[0]) < 10 ? hour = "0" + timeList[0].replace("0", "") : hour = timeList[0]
            setOpenHour(`${hour}:${timeList[1]}`)
            setCloseHour(dateObject.closingHour)
            setOpeningDate(dateObject.openingDate)
            setActiveDate(dateObject.activeDate)
            setCapacity(dateObject.reservationLimit)
            setReferenceObject(dateObject)
        }
    }, [])

    useEffect(() => {

        if (capacity < dateObject.reservationAmount){
            setCapacityError(true)
            return
        }
        setCapacityError(false)

        if (activeDate !== dateObject.activeDate && !dateObject.activeDate){
            const openingsDate = new Date(dateObject.openingDate)
            const date = new Date()
            date.setHours(2, 0, 0, 0)
            if (openingsDate.getTime() < date.getTime()){
                setDateError(true)
                return
            }
        }
        setDateError(false)
        updateDate({...dateObject, openingHour: openHour, closingHour: closeHour, openingDate:openingDate, activeDate:activeDate, reservationLimit: capacity})
    }, [openHour, closeHour, openingDate, activeDate, capacity])

    return (
        <Card className={"col-12 col-md-5 col-lg-4 col-xl-3 mx-auto my-3 p-0"}>
            <Card.Header>
                <Card.Title>
                    <div className="d-flex justify-content-between align-items-center">
                        <p className="lead fs-5">Reservatie dag: <br/> {dateObject.openingDate}</p>
                        <Button variant={dateObject.activeDate ? "danger" : "success"} onClick={(e) => {
                            e.preventDefault()
                            setActiveDate(!activeDate)
                            console.log('set Active Date to ', activeDate)
                        }}>
                            {dateObject.activeDate ? <FaBox fontSize={24}/> : <FaBoxOpen fontSize={24}/> }
                        </Button>
                    </div>
                </Card.Title>
            </Card.Header>
            <Card.Body className={'d-flex justify-content-start gap-1 flex-wrap'}>
                {capacityError ? <p className="lead text-danger m-1">Reservatie limiet mag niet kleiner zijn dan het huidig aantal reservaties</p> :null}
                {dateError ? <p className="lead text-danger m-1">Deze dag is al verlopen en kan niet op actief gezet worden</p> :null}
                <div className="col-12 d-flex justify-content-between ms-auto me-0">
                   <p className={'lead fs-5 m-0'}>aantal reservaties:</p>
                    <div className={'d-flex flex-nowrap col-6 justify-content-end'}>
                   <p className={'lead fs-5 m-0 me-2'}>{dateObject.reservationAmount} /
                   </p>
                       <input type="text" value={capacity} className={'form-control w-50 text-center p-1'} onChange={e => setCapacity(e.target.value)}/>
                    </div>
                </div>
                <div className="col-12">
                    <ReservationInput value={openingDate} type={"date"} text={"Openingsdag:"} FaSymbol={<FaCalendar/>}
                                      setter={setOpeningDate}/>
                </div>
                <div className="row">
                    <ReservationInput className={'col-6'} value={openHour} setter={setOpenHour} FaSymbol={<FaClock/>}
                                      text={"Openingsuur:"} type={"time"}/>
                    <ReservationInput className={'col-6'} value={closeHour} setter={setCloseHour} FaSymbol={<FaClock/>}
                                      text={"Sluitingsuur:"} type={"time"}/>
                </div>
            </Card.Body>
        </Card>
    )

}

export default OpeningDateField;