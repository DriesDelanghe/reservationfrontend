import {useEffect, useState} from "react";
import ReservationDateField from "../../components/admin/reservationpage/ReservationDateField";

const ReservationPage = ({fetchWithCsrf}) => {

    const [reservationDates, setReservationDates] = useState([{}])
    const [activeDate, setActiveDate] = useState({})

    useEffect(() => {
        const fetchReservationDates = async () => {
            const fetchOptions = {
                method: "GET"
            }
            const res = await fetchWithCsrf("/data/openingdates", fetchOptions)
            return await res.json();
        }
        fetchReservationDates().then(data => setReservationDates(data));
    }, []);

    return (
        <div className="container-fluid mx-auto mt-3">
            <h1 className="display-6 text-center">Reservaties</h1>
            <div className="row gap-3 justify-content-center">
                {reservationDates.map((reservationDate, index) => <ReservationDateField key={index} openingDate={reservationDate} setActiveDate={setActiveDate} /> )}
            </div>
        </div>
    )

}

export default ReservationPage;