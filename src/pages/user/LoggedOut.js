import {Link} from "react-router-dom";


const LoggedOut = ({credentials}) => {
    return  (
        <div className="container mx-auto border rounded-2 mt-3 p-3">
            {credentials.role === `ANONYMOUS` ?
                <>
                <h1 className="display-6 fs-4 text-center">U bent succesvol uitgelogd!</h1>
                <div className="d-flex justify-content-center gap-5 mt-4 px-2">
                    <Link to={"/login"} className={`btn btn-dark`}>
                        Inloggen
                    </Link>
                    <Link to={"/"} className={`btn btn-dark`}>
                        Reserveren
                    </Link>
                </div>
                </> :
            <h1 className={`display-6 fs-5 text-danger`}>Er is iets fout gelopen met de logout, probeer opnieuw</h1> }
        </div>
    )
}
export default LoggedOut;