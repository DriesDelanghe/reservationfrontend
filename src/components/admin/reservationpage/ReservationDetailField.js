import {Card, ListGroup} from "react-bootstrap";


const ReservationDetailField = ({reservation}) => {

    return (
        <Card className={"col-12 col-md-6 p-0"}>
            <Card.Header className={"bg-secondary text-light"}>
                {reservation.personList.length} plaatsen
            </Card.Header>
            <Card.Body>
                <p className={'lead m-0 fs-5'}>geplaatst op {reservation.reservationDate}</p>
                <ListGroup className={'mt-3'}>
                    <ListGroup.Item className="lead fs-5">Aanwezigen: <br/>
                    </ListGroup.Item>
                    {reservation.personList.map((person, index) =>
                        <ListGroup.Item
                            className={index === reservation.personList.length - 1 ? 'border-top-0 lead' : 'border-top-0 border-bottom-0 lead'}>{person.firstName} {person.lastName}</ListGroup.Item>
                    )}
                </ListGroup>
            </Card.Body>
        </Card>
    )
}

export default ReservationDetailField;