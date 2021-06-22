import {Modal, Button} from "react-bootstrap";

const DeleteModal = ({ reservation, show, setShow, fetchWithCsrf, reservations, setReservations}) => {

    const deleteReservation = async (e) => {
        e.preventDefault();
        const fetchOptions = {
            method: `DELETE`,
            headers: {
                'Content-Type' : 'application/json;charset=utf-8'
            }
        }

        const res = await fetchWithCsrf(`/protected/reservation/${reservation.id}`, fetchOptions);
        if (res.ok){
            setReservations(reservations.filter(object => object.id !== reservation.id))
        }
        setShow(false);
    }


    return (
        <Modal show={show} size="lg"
               aria-labelledby="contained-modal-title-vcenter"
               centered={true}>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    <h2 className={`ms-3 display-6 my-3 text-center`}>Verwijderen van reservatie</h2>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className={`container mx-auto d-flex flex-column align-items-center my-3`}>
                    <p className={`lead fs-6 m-0`}>Bent u zeker dat u de reservatie van {reservation.reservationDate} wilt verwijderen?</p>
                    <p className="lead fs-6 fw-bold m-0">Deze actie is permanent</p>
                </div>
            </Modal.Body>
                <Modal.Footer>
                    <Button variant={`secondary`} onClick={() => setShow(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={(e) => deleteReservation(e)}>
                        Verwijderen
                    </Button>
                </Modal.Footer>
        </Modal>
    )
}

export default DeleteModal;