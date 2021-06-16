import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Header from './components/header'
import Reservation from "./pages/reservation";
import Overview from "./pages/overview";
import './App.css'
import {useState} from "react";
import './bootstrapSettings.scss'

function App() {

    const RESTIP = '192.168.0.140';
    const port = '8080'

    const baseUrl = `http://${RESTIP}:${port}/data`

    const [reservations, setReservations] = useState([])
    const [showModal, setShowModal] = useState(false);
    const [serverError, setServerError] = useState(``)

    const addReservation = async (object) => {
        if (!reservations.find(reservation => reservation === object)) {
            const reservation = await submitData(object, `/reservation/`);
            if (reservation) {
                setReservations([...reservations, reservation]);
            }
        }
    }

    const submitData = async (data, url) => {
        const res = await fetch(baseUrl + url, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });
        if (res.status !== 200) {
            console.log(res.status)
            setServerError(`unable to connect to server`)
            return null;
        }
        setShowModal(false);
        const serverData = await res.json();
        return serverData;
    }

    return <Router>
        <Header/>
        <Switch>
            <Route exact path="/" render={() => <Reservation addReservation={addReservation} setShowModal={setShowModal}
                                                             serverError={serverError} showModal={showModal}/>}/>
            <Route exact path="/overview" component={Overview}/>
        </Switch>
    </Router>;
}

export default App;
