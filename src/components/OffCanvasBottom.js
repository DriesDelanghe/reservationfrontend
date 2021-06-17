import {Link} from "react-router-dom";

const OffCanvasBottom = () => {

    return(
        <div className="offcanvas offcanvas-bottom show" tabIndex="-1" id="offcanvasBottom"
             data-bs-scroll="true" data-bs-backdrop="false" aria-labelledby="offcanvasBottomLabel">
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasBottomLabel">Inloggen</h5>
                <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas"
                        aria-label="Close">

                </button>
            </div>
            <div className="offcanvas-body small">
                <p>Om je reservaties achteraf opnieuw te kunnen bekijken of te kunnen verwijderen moet ge ingelogd zijn</p>

                <div className="container p-2 mx-auto d-flex justify-content-start">
                <Link to={'/login'} className={`btn btn-secondary mx-2`}>
                    Inloggen
                </Link>
                    <Link to={`/register`} className={`btn btn-secondary mx-2`}>
                        Registreren
                    </Link>
                </div>
            </div>
        </div>
    )

}

export default OffCanvasBottom;