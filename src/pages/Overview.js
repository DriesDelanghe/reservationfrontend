import {useEffect, useState} from "react";
import OverviewField from "../components/overviewComponents/overviewField";

const Overview = ({fetchWithCsrf}) => {

    const [backendReservation, setBackendReservation] = useState([{}]);

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
        fetchDataReservation();
    },[])

    return (
        <div className="container mx-auto mt-3">
            <h2 className="display-5 text-center">Overview</h2>
            {backendReservation.map((object, index) => (<OverviewField key={index} object={object}/>))}
            {!backendReservation[0] ? <h2 className={'display-6 fs-5'}>Nog geen reservaties geplaatst</h2> : null}
        </div>
    );
}
export default Overview