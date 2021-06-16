import {Modal, Spinner, Button} from "react-bootstrap";

const ModalServerLoad = ({show, setShow, serverError}) => {

    const handleClose = () => setShow(false);

    return (
        <Modal show={show} size="lg"
               aria-labelledby="contained-modal-title-vcenter"
               centered={true}>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    <h2 className={`display-6 my-3 text-center`}>Fetching data from server</h2>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className={`container mx-auto d-flex flex-column align-items-center my-3`}>
                    {serverError ? <p className={`lead`}>{serverError}</p> : <Spinner animation="border" variant="primary" />}
                </div>
            </Modal.Body>
            {serverError ?
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
            : null}
        </Modal>
    )
}

export default ModalServerLoad;