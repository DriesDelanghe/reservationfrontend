import {useEffect, useState} from "react";
import ReservationDateField from "../../components/admin/reservationpage/ReservationDateField";

const ReservationPage = ({fetchWithCsrf, setActiveDate, setShowModal, setServerError, setNameAndLink }) => {

    const [reservationDates, setReservationDates] = useState([{}])

    useEffect(() => {
        const nameLinkArray=[
            {
                name: 'Homepage',
                link: '/admin'
            },
            {
                name: 'Reservaties',
                link: '/admin/reservations'
            }
        ]
        setNameAndLink(nameLinkArray)
    }, [])

    useEffect(() => {
        const fetchReservationDates = async () => {
            const fetchOptions = {
                method: "GET"
            }
            const res = await fetchWithCsrf("/restricted/openingdates", fetchOptions)
            return await res.json();
        }
        setShowModal(true)
        fetchReservationDates().then(data => {
            setReservationDates(data)
            setShowModal(false)
        }).catch(e => {
            setServerError("An error occured fetching openingdates from server")
        });
    }, []);

    return (
        <div className="container mx-auto mt-3">
            <h1 className="display-6 text-center">Reservaties</h1>
            <div className="row gap-3 justify-content-center">
                {reservationDates.map((reservationDate, index) => <ReservationDateField key={index} openingDate={reservationDate} setActiveDate={setActiveDate} />)}
            </div>
        </div>
    )

}

export default ReservationPage;