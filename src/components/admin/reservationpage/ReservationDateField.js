import {Card} from "react-bootstrap";
import {useHistory} from "react-router-dom";

const ReservationDateField = ({openingDate, setActiveDate }) => {

    const history = useHistory()

    const onClickDateField = () => {
        setActiveDate(openingDate)
        history.push("/admin/reservations/details")
    }

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
                        {openingDate.reservationAmount > 0 ? <button className="btn btn-dark" onClick={() => onClickDateField()}>Bekijk
                            reservaties</button> : <p className="lead text-center">Er zijn nog geen reservaties geplaatst voor deze dag</p>}
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}

export default ReservationDateField;