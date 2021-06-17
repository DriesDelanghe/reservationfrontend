import {useState, useEffect} from 'react'
import NameComponent from '../components/NameComponent.js'
import Calendar from '../components/calendar/Calendar'
import EmailComponent from "../components/EmailComponent";
import ErrorMessage from "../components/ErrorMessage";
import ModalServerLoad from "../components/ModalServerLoad";

const Reservation = ({addReservation, serverError, showModal, setShowModal}) => {

    //different UseStates
    const [reservationDates, setReservationDates] = useState([{id: null, openingDate: '2021-07-06'}]);
    const [monthNames, setMonthNames] = useState([]);
    const [period, setPeriod] = useState([[]])
    const [selectedDates, setSelectedDates] = useState([])
    const [people, setPeople] = useState([])
    const [email, setEmail] = useState({id: null, email: ''})
    const [confirmation, setConfirmation] = useState(false);
    const [personError, setPersonError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [selectedDatesError, setSelectedDatesError] = useState(false);
    const [emailFormatError, setEmailFormatError] = useState(false);


    //fetch the data from backend
    const fetchServerData = async (url) => {
        const res = await fetch(url)
        const data = await res.json();
        return data;
    }

    //submit data to the server
    const submitStateData = async (data, url) => {
        const res = await fetch( url, {
            method: 'PUT',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });
        const serverData = await res.json();
        return serverData;
    }

    //set monthNames to data received from server, only called on load
    useEffect(() => {
        const getMonthName = async () => {
            const monthNamesServer = await fetchServerData(`/data/month`);
            setMonthNames([...monthNamesServer]);
        }
        getMonthName();
    }, []);

    //set openingDates to data received from server, only called on load
    useEffect(() => {
        const getReservationDates = async () => {
            const reservationDatesServer = await fetchServerData(`/data/openingdates`);
            setReservationDates(reservationDatesServer.filter(object => new Date(object.openingDate).getTime() > new Date().getTime()));
        }
        getReservationDates();
    }, []);

    //set  period to data reveived from server, only called on load
    useEffect(() => {
        const getPeriod = async () => {
            const periodServer = await fetchServerData(`/data/period`);
            console.log(periodServer)
            setPeriod([...periodServer]);
        }
        getPeriod();
    }, []);


    const addPerson = (person) => {
        const localid = people[people.length - 1] ? people[people.length - 1].localid + 1 || 1 : 1;
        const newPerson = {id: null, localid: localid, ...person};
        setPeople([...people, newPerson]);
        setPersonError(false);
    }

    const removePerson = (id) => {
        setPeople(people.filter((person) => person.localid !== id))
    }

    const toggleDate = (id) => {
        if (!selectedDates.find(object => object.id === id)) {
            const newDate = reservationDates.find(object => object.id === id)
            setSelectedDates([...selectedDates, newDate])
            setSelectedDatesError(false);
            return;
        }
        setSelectedDates(selectedDates.filter(object => object.id !== id));
    }

    const onChangeEmail = (e) => {
        const newEmail = {id: null, email: e.target.value}
        setEmail(newEmail)
        setEmailError(false);
        setEmailFormatError(false);
    }

    const checkSubmit = async (e) => {
        e.preventDefault();
        setShowModal(true)
        const regex = /\S+@\S+\.\S+/;
        if (!people[0] || (!email.email && confirmation) || !selectedDates[0] || (!selectedDatesError && email.email && !regex.test(email.email))) {
            !people[0] ? setPersonError(true) : setPersonError(false);
            !email.email && confirmation ? setEmailError(true) : setEmailError(false);
            !selectedDates[0] ? setSelectedDatesError(true) : setSelectedDatesError(false);
            !emailError && !regex.test(email.email) && email.email ? setEmailFormatError(true) : setEmailFormatError(false);
            window.scrollTo(0, 0)
        setShowModal(false)
            return
        }
        console.log(`All data seems right to me!`)
        const reservation = constructReservationObject();
        addReservation(reservation);
    }

    const constructReservationObject = () => {
        const reservation = {id: null, openingDateList: selectedDates, personList: people, confirmation: confirmation}
        if (confirmation) {
            return {...reservation, email: email};
        }
        return reservation;
    }

    return (
        <>
            <ModalServerLoad show={showModal} serverError={serverError} setShow={setShowModal}/>
            {personError ? <ErrorMessage text={`Er moet minstens 1 persoon worden opgegeven`}/> : null}
            <NameComponent onAdd={addPerson} people={people} onRemove={removePerson}/>
            {selectedDatesError ? <ErrorMessage text={`Er moet minstens 1 datum worden aangeduid`}/> : null}
            <Calendar reservationDates={reservationDates} monthNames={monthNames} period={period}
                      toggleDate={toggleDate}/>
            {emailError ? <ErrorMessage text={`Gelieve een email adres in te vullen`}/> : null}
            {emailFormatError ? <ErrorMessage text={`De opgegeven email heeft geen geldig formaat`}/> : null}
            <EmailComponent email={email} onChangeEmail={onChangeEmail} confirmation={confirmation}
                            setConfirmation={setConfirmation}/>
            <div className="container mx-auto my-3 px-3 d-flex justify-content-end justify-content-md-start">
                <button type={`button`} className={`btn btn-success`} onClick={(e) => checkSubmit(e)}>
                    <span>Bevestigen</span>
                </button>
            </div>
        </>
    )
};

export default Reservation;