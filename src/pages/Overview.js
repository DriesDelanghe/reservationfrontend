import {useContext, useEffect, useState} from "react";
import OverviewField from "../components/overviewComponents/overviewField";
import {useHistory} from "react-router-dom";

const Overview = ({fetchWithCsrf, credentials, setReservation}) => {

    const [backendReservation, setBackendReservation] = useState([]);
    const history = new useHistory();

    useEffect(() => {
        const fetchDataReservation = async () => {
            const fetchOptions = {
                method: "GET",
                header: {
                    "Content-Type": "application/json"
                }
            }
            const res = await fetchWithCsrf("/protected/reservation/user", fetchOptions);
            console.log(`res: ${res}`)
            const data = await res.json();
            if (data) {
                setBackendReservation([...data] || [data])
            }
        }
        if (credentials.role !== `ANONYMOUS`) {
            fetchDataReservation();
        }
    }, [])

    const editReservation = (reservation) => {
        setReservation(reservation);
        history.push("/" );
    }

    const newReservation = (e) => {
        e.preventDefault()
        setReservation({})
        history.push("/")
    }

    if (credentials.role !== 'ANONYMOUS') {
        return (
            <div className="container mx-auto mt-3">
                <div className="container mx-auto d-flex justify-content-start my-3">
                    <button className={`btn btn-dark`} onClick={(e) => newReservation(e)}>Nieuwe reservatie</button>
                </div>
                <h2 className="display-5 text-center">Jouw reservaties</h2>
                {backendReservation[0] ? backendReservation.map((object, index) => (
                    <OverviewField key={index} object={object} fetchWithCsrf={fetchWithCsrf}
                                   reservations={backendReservation} setReservations={setBackendReservation}
                                   editReservation={editReservation}/>)) : <h2 className={'display-6 fs-5 text-center'}>Nog geen reservaties geplaatst</h2>}
            </div>
        );
    }
    return (
        <div className={'container mx-auto mt-3'}>
            <h2 className="display-5 text-center">Geen toegang</h2>
            <p className="lead fs-6 text-center">Reservaties kunnen enkel bekeken worden als je bent ingelogd</p>
        </div>
    )
}
export default Overview