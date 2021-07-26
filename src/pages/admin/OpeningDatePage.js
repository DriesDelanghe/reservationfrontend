import React, {useEffect, useState} from "react";
import AdminCalendar from "../../components/admin/openingdatepage/Calendar/AdminCalendar";

const OpeningDatePage = ({setNameAndLink, setServerError, setShowModal, fetchWithCsrf, submitData}) => {

    const [openingDates, setOpeningDates] = useState([])
    const [updatedDates, setUpdatedDates] = useState([])

    useEffect(() => {
        const nameLinkArray = [
            {name: 'Homepage', link: '/admin'},
            {name: 'Openingdagen', link: '/admin/openingdates'}
        ]
        setNameAndLink(nameLinkArray)
    }, [])

    useEffect(() => {

        const fetchActiveDates = async () => {
            const fetchOptions = {method: "GET"}
            const res = await fetchWithCsrf("/restricted/openingdates", fetchOptions)
            return await res.json()
        }
        setShowModal(true)
        try {
            fetchActiveDates().then(data => {
                const dates = [...data]
                dates.sort((a, b) => new Date(a.openingDate).getTime() - new Date(b.openingDate).getTime())
                setOpeningDates([...dates])
            })
        } catch (e) {
            console.log("an error occurred, ", e)
            setServerError('An error occured while fetching openingdates from the server')
            return
        }
        setShowModal(false)
    }, [])

    const updateDate = (dateObject) => {
        let savedObject = false
        if (dateObject.id == null) {
            submitData(dateObject, `/restricted/openingdates/`).then((data) => {
                data.json().then(data => {
                    dateObject = {...data}
                    console.log(JSON.stringify(dateObject))
                    saveDateObjectToArray(dateObject, true)
                })
            })
            return
        }
        if (dateObject.id) {
            const referenceObject = openingDates.find(object => object.id === dateObject.id)
            if (referenceObject != null) {
                if (referenceObject.activeDate !== dateObject.activeDate || dateObject.removed) {
                    submitData(dateObject, `/restricted/openingdates/${dateObject.id}`).then(data => dateObject = data)
                    savedObject = true
                }
            }
            saveDateObjectToArray(dateObject, savedObject)
        }
    }

    const saveDateObjectToArray = (dateObject, savedObject) => {
        console.log(`putting ${JSON.stringify(dateObject)} in array`)
        addToArray(dateObject, setOpeningDates, openingDates)
        if (!savedObject) {
            setUpdatedDates([...updatedDates.filter(object => object.id !== dateObject.id), dateObject])
        }
    }

    const addToArray = (dateObject, stateSetter, stateArray) => {
        let referenceArray = [...stateArray]
        if (dateObject.id) {
            setOpeningDates(openingDates.filter(date => date.id !== dateObject.id))
            referenceArray = [...referenceArray.filter(date => date.id !== dateObject.id)]
        }
        referenceArray.push(dateObject)
        referenceArray.sort((a, b) => new Date(a.openingDate).getTime() - new Date(b.openingDate).getTime())
        stateSetter(referenceArray)
    }

    const saveDate = (dateObject) => {
        submitData(dateObject, `/restricted/openingdates/${dateObject.id}`).then(
            () => {
                setUpdatedDates([...updatedDates.filter(object => object.id !== dateObject.id)])
                console.log(`removed dateObject ${dateObject.id} from updated array ${JSON.stringify(updatedDates)}`)
            }
        )

    }

    const saveAllData = () => {
        updatedDates.forEach(object => submitData(object, `/restricted/openingdates/${object.id}`))
        setUpdatedDates([{}])
    }

    return (
        <AdminCalendar/>
    )


    /* (
        <>
            <div className="float-end p-3">
                {updatedDates.length > 0 && updatedDates[0].id ?
                    <Button variant={"primary"} onClick={() => saveAllData()}>
                        <p className={`lead m-0`}><FaSave fontSize={22} className={`me-2`}/> save all</p>
                    </Button> : null}
            </div>
            <div className="accordion" id="accordionPanelsStayOpenExample">
                <div className="accordion-item">
                    <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                        <button className="accordion-button display-6 fw-normal fs-5" data-bs-toggle="collapse"
                                data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true"
                                aria-controls="panelsStayOpen-collapseOne">
                            Actieve reservaties
                            <p className="m-0 ms-3 lead">aantal: {openingDates.filter(object => object.activeDate && !object.removed).length}</p>
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show"
                         aria-labelledby="panelsStayOpen-headingOne">
                        <div className="accordion-body container-fluid row">
                            <div className="row mx-0">
                                {openingDates && openingDates[0] ? openingDates.filter(object => object.activeDate && !object.removed).map((activeDate) =>
                                        <OpeningDateField
                                            key={activeDate.id} dateObject={activeDate}
                                            updateDate={updateDate} saveDate={saveDate}
                                            isUpdated={!!updatedDates.find(object => object.id === activeDate.id)}/>) :
                                    <p className="lead mt-3">Geen data gevonden</p>}
                            </div>
                            <div className="row mx-0">
                                <NewOpeningDateField key={1} updateDate={updateDate} defaultActive={true}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
                        <button className="accordion-button collapsed display-6 fw-normal fs-5"
                                data-bs-toggle="collapse"
                                data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false"
                                aria-controls="panelsStayOpen-collapseTwo">
                            Inactieve reservaties
                            <p className="m-0 ms-3 lead">aantal: {openingDates.filter(object => !object.activeDate && !object.removed).length}</p>
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse"
                         aria-labelledby="panelsStayOpen-headingTwo">
                        <div className="accordion-body container-fluid">
                            <div className="row mx-0">
                                {openingDates && openingDates[0] ? openingDates.filter(object => !object.activeDate && !object.removed).map((activeDate) =>
                                        <OpeningDateField
                                            key={activeDate.id} updateDate={updateDate}
                                            dateObject={activeDate} saveDate={saveDate}
                                            isUpdated={!!updatedDates.find(object => object.id === activeDate.id)}/>) :
                                    <p className="lead mt-3">Geen data gevonden</p>}
                            </div>

                            <div className="row mx-0">
                                <NewOpeningDateField key={2} updateDate={updateDate} defaultActive={false}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
        */

}

export default OpeningDatePage