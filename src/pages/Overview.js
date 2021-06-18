import {useEffect, useState} from "react";
import OverviewField from "../components/overviewComponents/overviewField";

const Overview = ({fetchWithCsrf, credentials}) => {

    const [backendReservation, setBackendReservation] = useState([]);

    useEffect( () => {
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
            setBackendReservation([...data])
        }
        if (credentials.role !== `ANONYMOUS`) {
            fetchDataReservation();
        }
    },[])

    if (credentials.role !== 'ANONYMOUS') {
        return (
            <div className="container mx-auto mt-3">
                <h2 className="display-5 text-center">Jou reservaties</h2>
                {backendReservation.map((object, index) => (<OverviewField key={index} object={object}/>))}
                {!backendReservation[0] ? <h2 className={'display-6 fs-5 text-center'}>Nog geen reservaties geplaatst</h2> : null}
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