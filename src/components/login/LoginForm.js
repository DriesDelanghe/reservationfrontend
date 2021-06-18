import LoginInput from "./LoginInput";
import {useHistory} from "react-router-dom";

const LoginForm = ({ credentials, setCredentials, performLogin, doLogout }) => {

    const history = useHistory()

    const loginFunc = (e) => {
        e.preventDefault();
        performLogin().then(
            (data) => {
                console.log(data.role)
                if (data.role === "USER") {
                    history.push("/overview")
                }
            }
        )
    }

    if (credentials.role === `ANONYMOUS`) {
        return (
            <form onSubmit={(e) =>loginFunc(e)}
                  className={`container mx-auto mt-5 p-3 border shadow d-flex flex-column`}>
                <label>
                    <span>Gebruikersnaam</span>
                    <LoginInput type={`text`} name={`username`} placeholder={`Gebruikersnaam`} setCredentials={setCredentials}
                                credentials={credentials}/>
                </label>
                <label>
                    <span>Wachtwoord</span>
                    <LoginInput type={`password`} name={`password`} placeholder={`wachtwoord`}
                                setCredentials={setCredentials} credentials={credentials}/>
                </label>
                <div className="container">
                    <input type={`submit`} value={'Inloggen'} className={`btn btn-dark mt-3 ms-2`}/>

                </div>
            </form>
        )
    }
    return (
        <div className="container border mx-auto shadow-sm mt-5 p-3">
            <h2 className="display-5 text-center">Ingelogd!</h2>
            <div className="container d-flex justify-content-start">
                <button className={'btn btn-secondary'} onClick={() => doLogout()}>Uitloggen</button>
            </div>
        </div>
    )
}

export default LoginForm;