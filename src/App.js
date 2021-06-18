import {BrowserRouter as Router, Switch, Route, useHistory } from "react-router-dom";
import Header from './components/header'
import Reservation from "./pages/reservation";
import Overview from "./pages/Overview";
import OffCanvasBottom from "./components/OffCanvasBottom";
import LoginForm from "./components/login/LoginForm";
import Confirmation from "./pages/Confirmation";
import './App.css'
import {useEffect, useState} from "react";
import './bootstrapSettings.scss'

function App() {

    const baseUrl = `/data`

    const history = useHistory();
    const [reservations, setReservations] = useState([])
    const [showModal, setShowModal] = useState(false);
    const [serverError, setServerError] = useState(``)
    const [credentials, setCredentials] = useState({});

    const addReservation = async (object) => {
        if (!reservations.find(reservation => reservation === object)) {
            const reservation = await submitData(object, `/reservation`);
            if (reservation) {
                setReservations([...reservations, reservation]);
            }
        }
    }

    useEffect(async () => {
        console.log("useEffect: start");
        if (!document.cookie) {
            await authenticate("anonymous", "Pr0t3ct3d_")
            return
        }
        refreshAuthentication();
    }, [])


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
            const body = await response.json();
            console.log(`   async authenticate: received response ${JSON.stringify(body)}`);
            console.log("   async authenticate: done");
            setCredentials({username: body.username, role:body.role});
        } catch (e) {
            console.log(`   async authenticate: ERROR ${JSON.stringify(e)}`);
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

    const performLogin = async (e) => {
        e.preventDefault();
        if (credentials.username && credentials.password) {
            try {
                await authenticate(credentials.username, credentials.password);
            } catch (error) {
                console.error(error)
            }
        }
    }

    const submitData = async (data, url) => {

        const fetchOptions = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json;charset=utf-8',
                'X-Requested-With': 'XMLHttpRequest'},
            body: JSON.stringify(data)
        }

        const res = await fetchWithCsrf(baseUrl + url, fetchOptions);
        if (res.status !== 200) {
            console.log(res.status)
            setServerError(`unable to connect to server`)
            return null;
        }
        setShowModal(false);
        history.push("./confirmation")
    }

    const signout = async () => {
        const fetchOptions = {
            method: 'POST'
        }
        const res = await fetchWithCsrf('/logout', fetchOptions)
        await authenticate("anonymous", "Pr0t3ct3d_")
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
            setCredentials({username:body.username, role:body.role});
            console.log("   async refreshAuthentication: done");
        } catch (e) {
            console.log(`   async refreshAuthentication: ERROR ${e}`);
        }
    }

    return <Router>
        <Header credentials={credentials} doLogout={signout}/>
        <Switch>
            <Route exact path={'/login'}
                   render={() => <LoginForm credentials={credentials} setCredentials={setCredentials}
                                            performLogin={performLogin} doLogout={signout}/>}/>
            <Route exact path="/" render={() => <Reservation addReservation={addReservation} setShowModal={setShowModal}
                                                             serverError={serverError} showModal={showModal}/>}/>
            <Route exact path="/overview" component={Overview}/>
            <Route exact path={"/confirmation"} component={Confirmation}/>
        </Switch>
        <OffCanvasBottom/>
    </Router>;
}

export default App;
