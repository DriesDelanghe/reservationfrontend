import {useEffect} from "react";


const SelectedDateField = ({selectedDate, personList, toggleDate }) => {

    const reservationsLeft = selectedDate.reservationLimit - selectedDate.reservationAmount;
    const reservationAmount = personList.length;


    return(
        <div className="container d-flex justify-content-between border bg-light my-2 p-2">
            <div>
            <p className={reservationsLeft < reservationAmount ? `lead fs-6 text-danger m-0` : `lead fs-6 m-0`}>{selectedDate.openingDate}: <br/> openingsuren: {selectedDate.openingHour}-{selectedDate.closingHour}</p>
                {reservationsLeft < reservationAmount ? <p className={`lead fs-6 text-danger m-0`}>Er zijn nog maar {reservationsLeft} plaatsen vrij</p> : null}
            </div>
            <div className="d-flex justify-content-center align-items-center">
            <button className="btn btn-close" onClick={() => toggleDate(selectedDate.id)}>
            </button>
            </div>
        </div>
    )
}

export default SelectedDateField;