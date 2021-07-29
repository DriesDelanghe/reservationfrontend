import {Button, Modal} from "react-bootstrap";
import React, {useEffect, useState} from "react";


const DateDeleteModal = ({showModal, setShowModal, dateObjectBuilder, objectDelete, setShowPreviousModal}) => {

    const [show, setShow] = useState(showModal)
    const [dateObject, setDateObject] = useState(() => dateObjectBuilder())

    useEffect(() => {
        setDateObject(() => dateObjectBuilder())
    }, [dateObjectBuilder])

    useEffect(() => {
        setShow(showModal)
    }, [showModal])

    const handleClose = () => {
        setShowModal(false)
        objectDelete()
    }

    const handleCancel = () => {
        setShowModal(false)
        setShowPreviousModal(true)
    }

    return (
    <Modal show={show} size="lg"
           aria-labelledby="contained-modal-title-vcenter"
           centered={true} onHide={() => handleCancel()}>
        <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
                <h2 className={`display-6 my-3 text-center`}>{`Verwijderen van ${dateObject.eventName} op ${dateObject.openingDate}`}</h2>
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="container">
                <p className="lead">Bent u zeker dat u dit evenement wilt verwijderen?</p>
                <p className={"lead small"}><b>Deze actie is permantent</b></p>
            </div>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="danger" onClick={() => handleClose()}>
                Delete
            </Button>
            <Button variant={"secondary"} onClick={() => handleCancel()}>
                cancel
            </Button>
        </Modal.Footer>
    </Modal>
    )
}

export default DateDeleteModal;