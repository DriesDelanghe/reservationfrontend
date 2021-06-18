import {useHistory} from "react-router-dom";

const Confirmation = () => {

    const history = useHistory();


    return (
        <>
            <div className="container mx-auto border shadow-sm mt-5 py-5 rounded-2">
                <h2 className="display-5 text-center">Je reservatie is geplaatst!</h2>
            </div>
            <div className="container mx-auto d-flex justify-content-between mt-3">
                <button className={'btn btn-dark'} onClick={event => {
                    event.preventDefault()
                    history.push("/")
                }}>Nieuwe reservatie</button>
                <button className={'btn btn-dark'} onClick={(event => {
                    event.preventDefault();
                    history.push("/overview")
                })}>Overzicht</button>
            </div>
        </>
    )
}

export default Confirmation;