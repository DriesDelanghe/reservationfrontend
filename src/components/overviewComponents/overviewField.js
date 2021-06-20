import OverviewPeople from "./overviewPeople";
import OverviewDates from "./OverviewDates";
import OverviewEmail from "./OverviewEmail";
import DeleteModal from "./DeleteModal";
import {FaTrash, FaEdit} from "react-icons/all";
import {useState} from "react";

const OverviewField = ({object, fetchWithCsrf, reservations, setReservations, editReservation}) => {

    const [showModal, setShowModal] = useState(false);

    const editClick = (e) => {
        e.preventDefault()
        editReservation(object)
    }

    return (
        <>
            <div className="container mx-auto border shadow-sm p-3 my-3">
                <div className={`container.mx-auto d-flex justify-content-end gap-3`}>
                    <button className={`btn btn-dark`} onClick={(e) => editClick(e)}>
                        <FaEdit />
                    </button>
                    <button className={`btn btn-danger`} onClick={() => setShowModal(true)}>
                        <FaTrash />
                    </button>
                </div>
                <h2 className="display-6 fs-5 fw-normal mx-auto">Reservatie {object.reservationDate}</h2>
                {object.personList ? <OverviewPeople people={object.personList}/> : null}
                {object.openingDateList ? <OverviewDates dates={object.openingDateList}/> : null}
                {object.confirmation ? <OverviewEmail email={object.email}/> : null}
            </div>
            <DeleteModal show={showModal} setShow={setShowModal} reservation={object} fetchWithCsrf={fetchWithCsrf}
                         reservations={reservations} setReservations={setReservations}/>
        </>
    )
}
export default OverviewField;