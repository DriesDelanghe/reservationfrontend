import React, {useEffect, useState} from "react";
import AdminCalendar from "../../components/admin/openingdatepage/Calendar/AdminCalendar";

const OpeningDatePage = ({setNameAndLink, setServerError, setShowModal, fetchWithCsrf, submitData}) => {

    const [openingDates, setOpeningDates] = useState([])

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
        console.log('object that arrived at update date: ', dateObject)
        if (dateObject.id) {
            submitData(dateObject, `/restricted/openingdates/${dateObject.id}`).then(data => {
                data.json().then(data => {
                    dateObject = {...data}
                }).then(() => {
                    addToArray(dateObject, setOpeningDates, openingDates)
                })
            })
        }
        if (dateObject.id == null) {
            submitData(dateObject, `/restricted/openingdates/`).then((data) => {
                data.json().then(data => {
                    dateObject = {...data}
                }).then(() => {
                    addToArray(dateObject, setOpeningDates, openingDates)
                })
            })
        }
    }

    const addToArray = (dateObject, stateSetter, stateArray) => {
        if (dateObject.id != null) {
            let referenceArray = [...stateArray]
            referenceArray = [...referenceArray.filter(date => date.id !== dateObject.id)]
            referenceArray = [...referenceArray, dateObject]
            referenceArray = [...referenceArray.filter(date => !date.removed)]
            referenceArray.sort((a, b) => new Date(a.openingDate).getTime() - new Date(b.openingDate).getTime())
            stateSetter(referenceArray)
            return
        }
        console.log('object did not retrieve id')
    }

    return (
        <AdminCalendar openingDateArray={openingDates} updateDate={updateDate}/>
    )

}

export default OpeningDatePage