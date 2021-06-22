import {Card} from "react-bootstrap";

const ReservationDateField = ({openingDate, setActiveDate }) => {


    return(
        <div className="col-10 col-md-5">
            <Card>
                <Card.Header className="d-flex justify-content-between p-3">
                    <div>
                    <Card.Title>{openingDate.openingDate}</Card.Title>
                    <Card.Subtitle className={`text-muted`}>{openingDate.openingHour}-{openingDate.closingHour}</Card.Subtitle>
                    </div>
                    <Card.Title className={`text-muted`}>{openingDate.reservationAmount}/{openingDate.reservationLimit}</Card.Title>
                </Card.Header>
                <Card.Body>
                    <div className="d-flex justify-content-end">
                        <button className="btn btn-dark">Bekijk reservaties</button>
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}

export default ReservationDateField;