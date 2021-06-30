import {useEffect, useState} from "react";
import OpeningDateField from "../../components/admin/openingdatepage/OpeningDateField";
import { Prompt } from 'react-router-dom'

const OpeningDatePage = ({setNameAndLink, setServerError, setShowModal, fetchWithCsrf}) => {

    const [activeDates, setActiveDates] = useState([{}])
    const [inactiveDates, setInactiveDates] = useState([{}])

    useEffect(() => {
        const nameLinkArray = [
            {name: 'Homepage', link: '/admin'},
            {name: 'Openingdagen', link: '/admin/openingdates'}
        ]
        setNameAndLink(nameLinkArray)
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            setShowModal(true)
            Promise.all([fetchActiveDates(), fetchInactiveDates()]).then(() => {
                setShowModal(false)
                console.log('active dates: ', activeDates)
                console.log('inactive dates: ', inactiveDates)
            })
                .catch(() => {
                    setServerError('An error occured while fetching openingdates from the server')
                })
        }

        fetchData()
    }, [])

    const fetchActiveDates = async () => {
        const fetchOptions = {method: "GET"}
        const res = await fetchWithCsrf("/data/openingdates", fetchOptions)
        const data = await res.json();
        console.log("actve dates from server: ", data)
        await setActiveDates(data)
        console.log("active dates in fetch function", activeDates)
    }

    const fetchInactiveDates = async () => {
        const fetchOptions = {method: "GET"}
        const res = await fetchWithCsrf("/restricted/openingdates/inactive", fetchOptions)
        const data = await res.json();
        console.log("inactive dates server: ", data)
        await setInactiveDates(data)
        console.log("inactive dates in fetch function", inactiveDates)
    }

    const updateDate = (dateObject) => {
        dateObject.activeDate ? addToArray(dateObject, setActiveDates, activeDates) : addToArray(dateObject, setInactiveDates, inactiveDates)
    }

    const addToArray = (dateObject, stateSetter, stateArray) => {
        let referenceArray = [...stateArray]
        setActiveDates(activeDates.filter(date => date.id !== dateObject.id))
        setInactiveDates(inactiveDates.filter(date => date.id !== dateObject.id))


        referenceArray = [...referenceArray.filter(date => date.id !== dateObject.id)]
        referenceArray.push(dateObject)
        referenceArray.sort((a, b) => new Date(a.openingDate).getTime() - new Date(b.openingDate).getTime())
        stateSetter(referenceArray)
    }

    return (
        <>
            <div className="accordion" id="accordionPanelsStayOpenExample">
                <div className="accordion-item">
                    <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                        <button className="accordion-button display-6 fs-5" data-bs-toggle="collapse"
                                data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true"
                                aria-controls="panelsStayOpen-collapseOne">
                            Actieve reservaties
                            <p className="m-0 ms-3 lead">aantal: {activeDates.length}</p>
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show"
                         aria-labelledby="panelsStayOpen-headingOne">
                        <div className="accordion-body container-fluid row">
                            {activeDates[0] ? activeDates.map((activeDate, index) => <OpeningDateField
                                    key={activeDate.id}
                                    dateObject={activeDate}
                                    updateDate={updateDate}/>) :
                                <p className="lead mt-3">Geen data gevonden</p>}
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
                        <button className="accordion-button collapsed display-6 fs-5" data-bs-toggle="collapse"
                                data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false"
                                aria-controls="panelsStayOpen-collapseTwo">
                            Inactieve Reservaties
                            <p className="m-0 ms-3 lead">aantal: {inactiveDates.length}</p>
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse"
                         aria-labelledby="panelsStayOpen-headingTwo">
                        <div className="accordion-body container-fluid row">
                            {inactiveDates[0] ? inactiveDates.map((activeDate, index) => <OpeningDateField
                                    key={activeDate.id} updateDate={updateDate}
                                    dateObject={activeDate}/>) :
                                <p className="lead mt-3">Geen data gevonden</p>}
                        </div>
                    </div>
                </div>
            </div>
            <Prompt message={"Am I doing this right?"} />
        </>

    )
}

export default OpeningDatePage