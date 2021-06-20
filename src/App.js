import {BrowserRouter as Router, Switch, Route, useHistory} from "react-router-dom";
import Header from './components/header'
import Reservation from "./pages/Reservation";
import Overview from "./pages/Overview";
import OffCanvasBottom from "./components/OffCanvasBottom";
import LoginForm from "./components/login/LoginForm";
import Confirmation from "./pages/Confirmation";
import LoginBanner from "./components/LoginBanner";
import './App.css'
import {useEffect, useState} from "react";
import './bootstrapSettings.scss'
import LoggedOut from "./pages/LoggedOut";
import Registration from "./pages/Registration";

function App() {

    const [reservations, setReservations] = useState([])
    const [showModal, setShowModal] = useState(true);
    const [serverError, setServerError] = useState(``)
    const [credentials, setCredentials] = useState({});
    const [reservationObject, setReservationObject] = useState({});

    const addReservation = async (object) => {
        if (!reservations.find(reservation => reservation === object)) {
            console.log(object)
            console.log(object.id, `id reservation`)
            const res = await submitData(object, `/data/reservation/${object.id ? object.id : ''}`);
            if (res) {
                const reservation = await res.json();
                setReservations([...reservations, reservation]);
                console.log(reservation, reservations)
            }
            return res;
        }
        return null;
    }

    useEffect(async () => {
        console.log("useEffect: start");
        if (!document.cookie) {
            await authenticate("anonymous", "Pr0t3ct3d_")
            return
        }
        refreshAuthentication();
    }, [])

    const removeReservations = () => {
        setReservations([]);
        setReservationObject({});
    }

    async function authenticate(username, password) {
        console.log(`   async authenticate: start ${username}`);
        try {
            const fetchOptions = {
                method: 'GET',
                'credentials': 'include',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'X-Requested-With': 'XMLHttpRequest',
                    authorization: "Basic " + window.btoa(`${username}:${password}`)
                },
            };
            const response = await fetch(`/authenticate`, fetchOptions);
            if (!response.ok) {
                return null
            }
            const body = await response.json();
            console.log(`   async authenticate: received response ${JSON.stringify(body)}`);
            console.log("   async authenticate: done");
            setCredentials({username: body.username, role: body.role});
            return {username: body.username, role: body.role};
        } catch (e) {
            console.log(`   async authenticate: ERROR ${JSON.stringify(e)}`);
            return null;
        }
    }

    const fetchWithCsrf = async (url, fetchOptions) => {
        const cookie = document.cookie.match(new RegExp('XSRF-TOKEN=([^;]+)'));
        const csrfToken = cookie && cookie[1];
        console.log(`fetchWithCredentials token=${csrfToken}`);
        const headers = csrfToken ? {...fetchOptions.headers, 'X-XSRF-TOKEN': csrfToken} : fetchOptions.headers;
        const optionsWithCredentials = {
            ...fetchOptions,
            'credentials': 'include',
            headers
        };
        return await fetch(url, optionsWithCredentials);
    }

    const performLogin = async () => {
        if (credentials.username && credentials.password) {
            try {
                const data = await authenticate(credentials.username, credentials.password);
                return data;
            } catch (error) {
                console.error(error)
                return null
            }
        }
    }

    const submitData = async (data, url) => {

        const fetchOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-Requested-With': 'XMLHttpRequest'
            },
            body: JSON.stringify(data)
        }

        const res = await fetchWithCsrf(url, fetchOptions);
        if (res.status !== 200) {
            console.log(res.status)
            setServerError(`unable to connect to server`)
            return null;
        }
        setShowModal(false);
        return res;
    }

    const signout = async () => {
        const fetchOptions = {
            method: 'POST'
        }
        const res = await fetchWithCsrf('/logout', fetchOptions)
        await authenticate("anonymous", "Pr0t3ct3d_")
        removeReservations();
    }

    async function refreshAuthentication() {
        console.log(`   async refreshAuthentication: start`);
        try {
            const fetchOptions = {
                method: 'GET',
                'credentials': 'include',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'X-Requested-With': 'XMLHttpRequest',
                },
            };
            const response = await fetch(`/authenticate`, fetchOptions);
            const body = await response.json();
            console.log(`   async refreshAuthentication: received response ${JSON.stringify(body)}`);
            setCredentials({username: body.username, role: body.role});
            console.log("   async refreshAuthentication: done");
        } catch (e) {
            console.log(`   async refreshAuthentication: ERROR ${e}`);
        }
    }

    console.log(credentials.role === `ANONYMOUS`, `credential check`)

    return <Router>
        <Header credentials={credentials} doLogout={signout}/>
        <LoginBanner credentials={credentials}/>
        <Switch>
            <Route exact path={'/login'}>
                <LoginForm credentials={credentials} setCredentials={setCredentials}
                           performLogin={performLogin} doLogout={signout} />
            </Route>
            <Route exact path={'/registration'} >
                <Registration />
            </Route>
            <Route exact path={'/logout'}>
                <LoggedOut credentials={credentials}/>
            </Route>
            <Route exact path="/">
                <Reservation addReservation={addReservation} setShowModal={setShowModal}
                             serverError={serverError} showModal={showModal}
                             credentials={credentials}
                             reservation={reservationObject}/>
            </Route>
            <Route exact path="/overview">
                <Overview fetchWithCsrf={fetchWithCsrf} credentials={credentials}
                          setReservation={setReservationObject}/>
            </Route>
            <Route exact path={"/confirmation"}>
                <Confirmation />
            </Route>
        </Switch>
        {credentials.role === `ANONYMOUS` ? <OffCanvasBottom/> : null}
    </Router>;
}

export default App;
