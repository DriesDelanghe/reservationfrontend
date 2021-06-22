import LoginInput from "./LoginInput";
import {useHistory} from "react-router-dom";
import {useState} from "react";
import {Link} from 'react-router-dom'

const LoginForm = ({ credentials, setCredentials, performLogin, doLogout }) => {

    const history = useHistory()

    const [loginError, setLoginError] = useState(false);

    const loginFunc = (e) => {
        e.preventDefault();
        performLogin().then(
            (data) => {
                if (data) {
                    console.log(data.role)
                    if (data.role === "USER") {
                        history.push("/overview")
                    }
                return
                }
                setLoginError(true)
            }
        )
    }

    const performLogout = () => {
        doLogout()
        history.push('/logout')
    }

    if (credentials.role === `ANONYMOUS`) {
        return (
            <form onSubmit={(e) =>loginFunc(e)}
                  className={`container mx-auto mt-5 p-3 border shadow d-flex flex-column`}>
                {loginError ? <div className="container p-2">
                    <p className="lead fs-6 text-danger">Foute gebruikersnaam of wachtwoord</p>
                </div> : null}
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
                <div className="container mt-4">
                    <p>nog geen account? <Link to={"/registration"} className={`btn-link`}>Registreren</Link></p>
                </div>
            </form>
        )
    }
    return (
        <div className="container border mx-auto shadow-sm mt-5 p-3">
            <h2 className="display-5 text-center">Ingelogd!</h2>
            <div className="container d-flex justify-content-start">
                <button className={'btn btn-secondary'} onClick={() => performLogout()}>Uitloggen</button>
            </div>
        </div>
    )
}

export default LoginForm;