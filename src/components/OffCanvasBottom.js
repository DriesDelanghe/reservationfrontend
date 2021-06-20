import {Link} from "react-router-dom";
import {useState} from "react";

const OffCanvasBottom = () => {

    const [shown, setShown] = useState(true)

    const onClickButton = (e) => {
        e.preventDefault()
        setShown(false)
    }
    if (shown) {
        return (
            <div className="container-fluid mx-0 border rounded-2 position-fixed bottom-0 p-3 bg-body">
                <div className="container-fluid mx-0 d-flex justify-content-end">
                    <button className="btn btn-close" onClick={(e) => onClickButton(e)}> </button>
                </div>
                <div className="container mx-auto">
                    <h2 className="display-6 fs-5">Hou je data bij</h2>
                    <p className="lead fs-6">Vergeet je niet in te loggen of te registreren om je reservaties op latere
                        datum opnieuw te kunnen bekijken.</p>
                    <div className="container d-flex justify-content-start gap-3 mb-3">
                        <Link to={"/login"} className={'btn btn-dark'} onClick={() => setShown(false)}>
                            <span>Inloggen</span>
                        </Link>
                        <Link to={"/registration"} className={'btn btn-dark'} onClick={() => setShown(false)}>
                            <span>registreren</span>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
    return <></>
}

export default OffCanvasBottom;