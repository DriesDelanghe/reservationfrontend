import {useState, useEffect} from 'react'
import NameComponent from '../components/NameComponent.js'
import Calendar from '../components/calendar/Calendar'

const Reservation = () => {

    const RESTIP = '127.0.0.1';
    const port = '8080'

    const baseUrl = `http://${RESTIP}:${port}/data`

    const [reservationDates, setReservationDates] = useState([{id:1, openingDate:'2021-07-06'}]);
    const [monthNames, setMonthNames] = useState([]);
    const [period, setPeriod] = useState([[]])

    //fetch the data from backend
    const fetchServerData = async(url) =>{
        const res = await fetch(baseUrl + url)
        const data = await res.json();
        return data;
    }

    useEffect( () => {
        const getMonthName = async () => {
            const monthNamesServer = await fetchServerData(`/month`);
            setMonthNames([...monthNamesServer]);
        }
        getMonthName();
    }, []);

    useEffect(() => {
        const getReservationDates = async() => {
            const reservationDatesServer = await fetchServerData(`/openingdates/all`);
            setReservationDates(reservationDatesServer.filter(object => new Date(object.openingDate).getTime() > new Date().getTime()));
        }
        getReservationDates();
    }, []);

    useEffect(() => {
        const getPeriod = async () => {
            const periodServer = await fetchServerData(`/period/all`);
            setPeriod([...periodServer]);
        }
        getPeriod();
    }, []);

    const [people, setPeople] = useState([])

    const addPerson = (person) => {
        const id = people[people.length - 1] ? people[people.length - 1].id + 1 || 1 : 1;
        const newPerson = {id, ...person};
        setPeople([...people, newPerson]);
    }

    const removePerson = (id) => {
        setPeople(people.filter((person) => person.id !== id))
    }

    return (
        <>
        <NameComponent onAdd={addPerson} people={people} onRemove={removePerson}/>
        <Calendar reservationDates={reservationDates} monthNames={monthNames} period={period} />
        </>
    )
};

export default Reservation;