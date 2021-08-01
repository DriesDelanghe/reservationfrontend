import React from "react";


const EventField = ({openingDate, isSelected, isFull, toggleDate}) => {

    const togglingDate = () => {
        console.log(`toggling date with id ${openingDate.id}`)
        toggleDate(openingDate.id)
    }

    return (
        <div className={`flex-fill p-2 ${isFull ? 'date-full' : isSelected ? 'date-selected' : 'date'}`}
             onClick={() => togglingDate()}>
            <p className="text-elipsis m-0">{openingDate.eventName}</p>
            <p className="text-end m-0">{openingDate.reservationAmount} / {openingDate.reservationLimit}</p>
        </div>
    )
}

export default EventField