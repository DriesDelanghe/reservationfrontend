import {useEffect, useState} from "react";


const ReservationPage = ({fetchWithCsrf}) => {

    const [reservationDates, setReservationDates] = useState([])

    useEffect(() => {
        const fetchReservationDates = async () => {
            const fetchOptions = {
                method: "GET"
            }
            const res = await fetchWithCsrf("/data/openingdates", fetchOptions)
            const data = await res.json();
            console.log(`fetched reservation dates `, data)
            setReservationDates(data)
        }
        fetchReservationDates();
    } , [])

    return (
        <div className="container-fluid mt-3">
            <h1 className="display-6">Reservaties</h1>
        </div>
    )

}

export default ReservationPage;