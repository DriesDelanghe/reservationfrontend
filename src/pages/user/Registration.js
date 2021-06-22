import {useState} from "react";
import ErrorMessage from "../../components/user/ErrorMessage";
import {
    FaEnvelope, FaEye,
    FaEyeSlash,
    FaLock, FaUser
} from "react-icons/all";
import {useHistory} from "react-router-dom";


const Registration = ({fetchWithCsrf, authenticate}) => {

    const [username, setUsername] = useState(``);
    const [password, setPassword] = useState(``);
    const [email, setEmail] = useState(``);
    const [defaultEmail, setDefaultEmail] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [userNameExists, setUserNameExists] = useState(false);
    const history = useHistory();


    const registerUser = (e) => {
        e.preventDefault();
        if (/\s+/.test(username) || /\W/.test(username)) {
            setNameError(true)
            return
        }
        setNameError(false);
        submitRegistration();
    }

    const contructUserInfo = () => {
        const user = {
            username: username,
            password: password,
            useEmail: defaultEmail,
            email: email
        }
        return user
    }

    const submitRegistration = async () => {
        const user = contructUserInfo()
        console.log(user)
        const fetchOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        }
        const res = await fetchWithCsrf("/data/register", fetchOptions);
        if (res.status === 406) {
            setErrorMessage("Gebruikersnaam is al in gebruik")
            return
        }
        if (!res.ok) {
            setErrorMessage("Er kan geen verbinding gemaakt worden met de server, probeer later opnieuw")
            return
        }
        setErrorMessage("")
        setUserNameExists(false)
        const account = await authenticate(username, password)
        history.push("/overview")
    }


    return (
        <>
            {errorMessage ? <ErrorMessage text={errorMessage}/> : null}
            <form onSubmit={(e) => registerUser(e)}
                  className={`container mx-auto rounded-2 border shadow-sm p-3 mt-3 d-flex flex-column align-items-center`}>
                <h1 className="display-6 fs-5 text-center">Registreren:</h1>
                <fieldset className="row mx-auto container py-3 ">
                    <legend className={`fw-light`}>Gebruikergegevens:</legend>
                    {nameError ? <ErrorMessage text={`De gebruikersnaam mag geen spaties of vreemde karakters bevatten`}
                                               className={`position-relative`}/> : null}
                    <div className="input-group my-1 flex-nowrap">
                <span className="input-group-text">
                    <FaUser fontSize={16} color={`black`}/>
                </span>
                        <div className="form-floating col-11 col-md-10">
                            <input type="text" id={`registrationUsername`} value={username}
                                   onChange={e => setUsername(e.target.value)}
                                   placeholder={`Gebruikersnaam`} className="form-control" required={true}/>
                            <label htmlFor={`registrationUsername`}>Gebruikersnaam</label>
                        </div>
                    </div>
                    <div className="input-group my-1 flex-nowrap">
                    <span className="input-group-text">
                        <FaLock fontSize={16}/>
                    </span>
                        <div className="form-floating col-9">
                            <input type={showPassword ? "text" : "password"} id={"floatingPassword"} value={password}
                                   placeholder={`Wachtwoord`}
                                   className={`form-control`} onChange={e => setPassword(e.target.value)}
                                   required={true}/>
                            <label htmlFor="floatingPassword" className="form-label">Wachtwoord</label>
                        </div>
                        <span className="input-group-text d-flex justify-content-center col-2 col-md-1"
                              onClick={e => setShowPassword(!showPassword)}>
                        {showPassword ? <FaEyeSlash fontSize={16}/> : <FaEye fontSize={16}/>}
                    </span>
                    </div>
                </fieldset>

                <fieldset className="row mx-auto container py-3">
                    <legend className="fw-light">Email adres:</legend>
                    <div className="input-group my-1 flex-nowrap">
                <span className="input-group-text">
                    <FaEnvelope fontSize={16} color={`black`}/>
                </span>
                        <div className="form-floating col-11 col-md-10">
                            <input type="email" value={email} id={"registrationEmail"}
                                   onChange={e => setEmail(e.target.value)} pattern={'\\S+@\\S+.\\S+'}
                                   placeholder={`Email adres`} className="form-control" required={true}/>
                            <label className={`form-label`} htmlFor={"registrationEmail"}>Email adres</label>
                        </div>
                    </div>
                    <div className="form-text">Dit email adres zal enkel worden gebruikt voor bevestigingsmails</div>
                    <div className="form-check px-5 my-2">
                        <input className="form-check-input keep" type="checkbox" value={defaultEmail}
                               onChange={e => setDefaultEmail(e.currentTarget.checked)} id="flexCheckDefault"/>
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            Gebruik dit email om bevestigingsmails te sturen met mijn reservatie
                        </label>
                    </div>
                </fieldset>

                <input type="submit" value="registreren" className={`btn btn-dark my-3`}/>
            </form>
        </>
    )

}

export default Registration;