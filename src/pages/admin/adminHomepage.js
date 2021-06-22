import {useEffect} from "react";
import {Route, Switch, useHistory} from "react-router-dom";
import HomePageBoxContainer from "../../components/admin/HomePageBoxContainer";
import ReservationPage from "./ReservationPage";

const AdminHomepage = ({credentials, fetchWithCsrf }) => {

    const history = useHistory();

    useEffect(() => {
        console.log(credentials.role, "user role should be admin")
        if (credentials.role !== "ADMIN") {
            history.push("/login")
            return
        }
        return
    }, [])

    return (
        credentials.role === "ADMIN" ?
            <Switch>
                <Route exact path={"/admin"}>
                    <HomePageBoxContainer/>
                </Route>
                <Route exact path={"/admin/reservations"}>
                    <ReservationPage fetchWithCsrf={fetchWithCsrf} />
                </Route>
            </Switch>
            :
            null
    )

}

export default AdminHomepage;