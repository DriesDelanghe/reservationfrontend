import {useState, useEffect} from 'react'
import NameComponent from '../../components/user/NameComponent.js'
import Calendar from '../../components/user/calendar/Calendar'
import EmailComponent from "../../components/user/EmailComponent";
import ErrorMessage from "../../components/user/ErrorMessage";
import ModalServerLoad from "../../components/user/ModalServerLoad";
import {useHistory} from "react-router-dom";
import {array} from "prop-types";

const Reservation = ({addReservation, serverError, showModal, setShowModal, credentials, reservation}) => {

    const history = useHistory()

    //different UseStates
    const [reservationDates, setReservationDates] = useState([{id: null, openingDate: '2021-07-06'}]);
    const [monthNames, setMonthNames] = useState([]);
    const [period, setPeriod] = useState([[]])
    const [selectedDates, setSelectedDates] = useState(reservation.openingDateList || [])
    const [people, setPeople] = useState(reservation.personList || [])
    const [email, setEmail] = useState(reservation.email || credentials.useEmail ? credentials.email : {
        id: null,
        email: ''
    })
    const [dateFull, setDateFull] = useState(false);
    const [confirmation, setConfirmation] = useState(reservation.confirmation || credentials.useEmail || false);
    const [personError, setPersonError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [selectedDatesError, setSelectedDatesError] = useState(false);
    const [emailFormatError, setEmailFormatError] = useState(false);
    const [dateFullError, setDateFullError] = useState(false);
    const [nameNotEmpty, setNameNotEmpty] = useState(false)
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');


    //fetch the data from backend
    const fetchServerData = async (url) => {
        const res = await fetch(url)
        const data = await res.json();
        return data;
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
            setReservationDates(reservationDatesServer.filter(object => {
                const openingsDate = new Date(object.openingDate)
                const date = new Date()
                date.setHours(2, 0, 0, 0)
                return openingsDate.getTime() >= date.getTime();
            }));
        }
        getReservationDates().then(r => setShowModal(false));
    }, []);

    //set  period to data reveived from server, only called on load
    useEffect(() => {
        const getPeriod = async () => {
            const periodServer = await fetchServerData(`/data/period`);
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
        setPeople(people.filter((person) => {
            if (person.id != null) {
                return person.id !== id;
            }
            return person.localid !== id
        }))
    }

    const toggleDate = (id) => {
        if (!selectedDates.find(object => object.id === id)) {
            const newDate = reservationDates.find(object => object.id === id)
            setSelectedDatesError(false);
            const sorted = [...selectedDates, newDate]
            sorted.sort(compareSelectedDates)
            setSelectedDates([...sorted])
            return;
        }
        setSelectedDates(selectedDates.filter(object => object.id !== id));
    }

    const compareSelectedDates = (objectA, objectB) => {
        if (objectA.id > objectB.id) return 1
        if (objectA.id < objectB.id) return -1
        return 0
    }

    const onChangeEmail = (e) => {
        const newEmail = {id: null, email: e.target.value}
        setEmail(newEmail)
        setEmailError(false);
        setEmailFormatError(false);
    }

    const checkDatesFull = () => {
        let amountExceeded = false;
        selectedDates.forEach(dateObject => {
            const amountAllowed = dateObject.reservationLimit - dateObject.reservationAmount;
            if(amountAllowed < people.length){
                console.log(`${amountAllowed} is smaller than ${people.length}`)
                amountExceeded = true;
            }
        })
        setDateFull(amountExceeded)
    }

    const checkSubmit = async (e) => {
        e.preventDefault();
        setShowModal(true)
        checkDatesFull()
        const regex = /\S+@\S+\.\S+/;
        if (!people[0] || (!email.email && confirmation) || !selectedDates[0] || (!selectedDatesError && email.email && !regex.test(email.email)) || dateFull
            || lastName || firstName) {
            !people[0] ? setPersonError(true) : setPersonError(false);
            !email.email && confirmation ? setEmailError(true) : setEmailError(false);
            !selectedDates[0] ? setSelectedDatesError(true) : setSelectedDatesError(false);
            !emailError && !regex.test(email.email) && email.email ? setEmailFormatError(true) : setEmailFormatError(false);
            lastName || firstName ? setNameNotEmpty(true) : setNameNotEmpty(false);
            dateFull ? setDateFullError(true) : setDateFull(false);
            window.scrollTo(0, 0)
            setShowModal(false)
            return
        }
        console.log(`All data seems right to me!`)
        const reservation = constructReservationObject();
        const res = await addReservation(reservation);
        console.log(res, "server response")
        if (res && res.ok) {
            history.push("/confirmation")
        }
    }

    const constructReservationObject = () => {
        let object;
        if (reservation && reservation.id) {
            console.log(`constructing reservation with id`)
            object = {
                ...reservation,
                openingDateList: selectedDates,
                personList: people,
                confirmation: confirmation
            }
        } else {
            console.log(`constructing new object`)
            object = {
                id: null,
                openingDateList: selectedDates,
                personList: people,
                confirmation: confirmation
            }
        }
        if (confirmation) {
            return {...object, email: email, confirmation: confirmation};
        }
        return object;
    }


    return (
        <>
            {credentials.role && credentials.role === `USER` ?
                <div className="container mx-auto d-flex justify-content-end mt-3">
                    <button className={`btn btn-dark`} onClick={(event => {
                        event.preventDefault()
                        history.push("/overview")
                    })}>Overzicht
                    </button>
                </div> : credentials.role && credentials.role === `ADMIN` ?
                    <div className="container mx-auto d-flex justify-content-end mt-3">
                        <button className={`btn btn-dark`} onClick={(event => {
                            event.preventDefault()
                            history.push("/admin")
                        })}>Admin panel
                        </button>
                    </div> : null}
            {dateFullError ? <ErrorMessage text={`Gelieve geen volzette dagen te selecteren`}/> : null}
            <ModalServerLoad show={showModal} serverError={serverError} setShow={setShowModal}/>
            {personError ? <ErrorMessage text={`Er moet minstens 1 persoon worden opgegeven`}/> : null}
            <NameComponent onAdd={addPerson} people={people} onRemove={removePerson}
                           firstName={firstName} lastName={lastName} setFirstName={setFirstName}
                           setLastName={setLastName}
                           nameNotEmpty={nameNotEmpty} setNameNotEmpty={setNameNotEmpty}/>
            {selectedDatesError ? <ErrorMessage text={`Er moet minstens 1 datum worden aangeduid`}/> : null}
            <Calendar reservationDates={reservationDates} monthNames={monthNames} period={period}
                      toggleDate={toggleDate} selectedDates={selectedDates} personList={people} setDateFull={setDateFull}/>
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
}

Reservation.defaultProps =
    {
        reservation: {}
    }

export default Reservation;