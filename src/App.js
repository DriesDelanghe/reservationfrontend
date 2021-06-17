import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Header from './components/header'
import Reservation from "./pages/reservation";
import Overview from "./pages/overview";
import OffCanvasBottom from "./components/OffCanvasBottom";
import LoginForm from "./components/login/LoginForm";
import './App.css'
import {useEffect, useState} from "react";
import './bootstrapSettings.scss'

function App() {

    const baseUrl = `/data`

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
        await authenticate("anonymous", "Pr0t3ct3d_")
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
                const fetchOptions = {
                    method: 'POST',
                    redirect: 'follow',
                    mode: 'same-origin',
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: `username=${credentials.username}&password=${credentials.password}`
                }
                const res = await fetchWithCsrf('/login', fetchOptions);

                await getAccountInfo();
            } catch (error) {
                console.error(error)
            }
        }
    }

    const getAccountInfo = async () => {
        const cookie = document.cookie.match(new RegExp('XSRF-TOKEN=([^;]+)'));
        const csrfToken = cookie && cookie[1];
        const fetchOptions = {
            method: 'GET',
            'credentials': 'include',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-XSRF-TOKEN': csrfToken
            },
        };
        const res = await fetch('/protected/account', fetchOptions)
        const data = await res.json();
        setCredentials({username: data.username, role: data.role})
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
        return await res.json();
    }

    return <Router>
        <Header credentials={credentials}/>
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
