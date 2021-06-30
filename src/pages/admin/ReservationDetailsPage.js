import {useEffect, useState} from "react";
import ReservationDetailField from "../../components/admin/reservationpage/ReservationDetailField";
import {Accordion, Card, Button, ListGroup} from "react-bootstrap";
import { FaChevronDown, FaChevronUp} from "react-icons/all";

const ReservationDetailsPage = ({activeDate, fetchWithCsrf, setShowModal, setServerError, setNameAndLink}) => {


    const [reservations, setReservations] = useState([{}])
    const [accordionExpanded, setAccordionExpanded] = useState(false)


    useEffect(() => {
        const nameLinkArray=[
            {
                name: 'Homepage',
                link: '/admin'
            },
            {
                name: 'Reservaties',
                link: '/admin/reservations'
            },
            {
                name: `reservaties ${activeDate.openingDate}`,
                link: '/admin/reservations/details'
            }
        ]
        setNameAndLink(nameLinkArray)
    }, [])

    useEffect(() => {
        const fetchReservations = async () => {
            const fetchOptions = {
                method: "GET"
            }
            const res = await fetchWithCsrf(`/restricted/reservation/${activeDate.id}`, fetchOptions);
            return res.json();
        }
        setShowModal(true)
        fetchReservations().then(data => {
            setReservations(data)
            setShowModal(false)
        }).catch(e =>
            setServerError("A problem occured fetching reservations by date from server")
        )
    }, [])

    return (
        <>
            <h1 className="display-6 text-center mt-3">Reservaties {activeDate.openingDate}</h1>
            <div className="container mx-auto">
                <Accordion>
                    <Card>
                        <Accordion.Toggle eventKey="0" as={Card.Header} className={"d-flex justify-content-between p-3"}
                                          onClick={() => {
                                              setAccordionExpanded(!accordionExpanded)
                                          }} style={{cursor: 'pointer'}}>
                            Bekijk de reservaties
                            {accordionExpanded ? <FaChevronUp/> : <FaChevronDown/>}
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body className={"row container mx-auto"}>
                                {reservations[0] && reservations[0].personList ? reservations.map((reservation, index) =>
                                        <ReservationDetailField key={index} reservation={reservation}/>) :
                                    <h2 className="display-6 fs-5 text-center">Er zijn (nog) geen reservaties geplaatst
                                        voor deze
                                        dag</h2>}
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>

                {reservations[0] && reservations[0].personList ? <div className="mt-5">
                    <ListGroup className={'border mb-5'}>
                        <ListGroup.Item className={'border-0 border-bottom'}>
                            <h2 className="lead fs-4">
                                Aanwezigen lijst:
                            </h2>
                        </ListGroup.Item>
                        {reservations.map((reservation) =>
                            reservation.personList.map((person) =>
                                <ListGroup.Item
                                    className={'lead fs-5 border-0'}>{person.firstName} {person.lastName}</ListGroup.Item>)
                        )}

                    </ListGroup>
                </div> : null}

            </div>
        </>
    )
}

export default ReservationDetailsPage;