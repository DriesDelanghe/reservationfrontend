import {useEffect, useState} from "react";
import {Route, Switch, useHistory} from "react-router-dom";
import HomePageBoxContainer from "../../components/admin/HomePageBoxContainer";
import ReservationPage from "./ReservationPage";
import ReservationDetailsPage from "./ReservationDetailsPage";
import ModalServerLoad from "../../components/user/ModalServerLoad";
import BreadCrumbs from "../../components/BreadCrumbs";
import OpeningDatePage from "./OpeningDatePage";

const AdminHomepage = ({credentials, fetchWithCsrf }) => {

    const [activeDate, setActiveDate] = useState({})
    const [showLoadModal, setShowLoadModal] = useState(false)
    const [serverError, setServerError] = useState('')
    const [nameAndLink, setNameAndLink] = useState([{}])


    useEffect(() => {
        setNameAndLink([{name: 'Homepage', link: '/admin'}])
    }, [])

    return (
        credentials.role === "ADMIN" ?
            <>
                <BreadCrumbs nameAndLink={nameAndLink} setNameAndLink={setNameAndLink}/>
            <Switch>
                <Route exact path={"/admin"}>
                    <HomePageBoxContainer/>
                </Route>
                <Route exact path={"/admin/reservations"}>
                    <ReservationPage fetchWithCsrf={fetchWithCsrf} setActiveDate={setActiveDate} setShowModal={setShowLoadModal}
                                     setServerError={setServerError} setNameAndLink={setNameAndLink}/>
                </Route>
                <Route exact path={"/admin/reservations/details"}>
                    <ReservationDetailsPage fetchWithCsrf={fetchWithCsrf} activeDate={activeDate} setServerError={setServerError}
                                            setShowModal={setShowLoadModal} setNameAndLink={setNameAndLink}/>
                </Route>
                <Route exact path={'/admin/openingdates'}>
                    <OpeningDatePage setServerError={setServerError} fetchWithCsrf={fetchWithCsrf}
                                     setShowModal={setShowLoadModal} setNameAndLink={setNameAndLink}/>
                </Route>
            </Switch>
                <ModalServerLoad setShow={setShowLoadModal} show={showLoadModal} serverError={serverError}/>
            </>
            :
            null
    )

}
export default AdminHomepage;