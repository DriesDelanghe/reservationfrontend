import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Header from './components/header'
import Reservation from "./pages/reservation";
import Overview from "./pages/overview";
import OffCanvasBottom from "./components/OffCanvasBottom";
import LoginForm from "./components/login/LoginForm";
import './App.css'
import {useState} from "react";
import './bootstrapSettings.scss'

function App() {

    const RESTIP = '192.168.5.163';
    const port = '8080'

    const baseUrl = ``

    const [reservations, setReservations] = useState([])
    const [showModal, setShowModal] = useState(false);
    const [serverError, setServerError] = useState(``)
    const [credentials, setCredentials] = useState({});

    const addReservation = async (object) => {
        if (!reservations.find(reservation => reservation === object)) {
            const reservation = await submitData(object, `/data/reservation`);
            if (reservation) {
                setReservations([...reservations, reservation]);
            }
        }
    }

    const performLogin = async (e) => {
        e.preventDefault();
        if (credentials.username && credentials.password) {
            try {
                const res = await fetch(baseUrl + `/authenticate`, {
                    method: 'GET',
                    'credentials': 'include',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                        'X-Requested-With': 'XMLHttpRequest',
                        authorization: "Basic " + window.btoa(`${credentials.username}:${credentials.password}`)
                    }
                })
                console.log(res);
                if (res.ok) {
                    const data = await res.json();
                    console.log(data)
                }
            } catch (error) {
                console.error(error)
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
            <Route exact path={'/login'}
                   render={() => <LoginForm credentials={credentials} setCredentials={setCredentials}
                                            performLogin={performLogin}/>}/>
            <Route exact path="/" render={() => <Reservation addReservation={addReservation} setShowModal={setShowModal}
                                                             serverError={serverError} showModal={showModal}/>}/>
            <Route exact path="/overview" component={Overview}/>
        </Switch>
        <OffCanvasBottom/>
    </Router>;
}

export default App;
