import LoginInput from "../components/login/LoginInput";
import {useState} from "react";
import {
    FaAd,
    FaAt,
    FaAtlas,
    FaEnvelope, FaEye,
    FaEyeSlash,
    FaLeaf,
    FaLock,
    FaMailBulk,
    FaMailchimp,
    FaUser
} from "react-icons/all";


const Registration = () => {

    const [username, setUsername] = useState(``);
    const [password, setPassword] = useState(``);
    const [email, setEmail] = useState(``);
    const [defaultEmail, setDefaultEmail] = useState(false);
    const [showPassword, setShowPassword] = useState(false)

    const registerUser = (e) => {
        e.preventDefault();
    }


    return (
        <form onSubmit={(e) => registerUser(e)} className={`container mx-auto rounded-2 border shadow-sm p-3 mt-3`}>
            <h1 className="display-6 fs-5 text-center">Registreren:</h1>
            <div className="row mx-auto container py-3 ">
                <div className="input-group my-1">
                <span className="input-group-text">
                    <FaUser fontSize={16} color={`black`}/>
                </span>
                    <div className="col-12 col-md-5">
                        <input type="text" value={username} onChange={e => setUsername(e.target.value)}
                               placeholder={`Gebruikersnaam`} className="form-control"/>
                    </div>
                </div>
                <div className="input-group my-1">
                    <span className="input-group-text">
                        <FaLock fontSize={16}/>
                    </span>
                    <div className="col-12 col-md-4">
                        <input type={showPassword ? "text" : "password"} value={password} placeholder={`wachtwoord`}
                               className={`form-control`} onChange={e => setPassword(e.target.value)}/>
                    </div>
                    <span className="input-group-text col-1 d-flex justify-content-center" onClick={e => setShowPassword(!showPassword)}>
                        {showPassword ? <FaEyeSlash fontSize={16}/> : <FaEye fontSize={16} /> }
                    </span>
                </div>
            </div>

            <div className="row mx-auto container py-3">
                <div className="form-check">
                    <input className="form-check-input keep" type="checkbox" value={defaultEmail} onChange={e => setDefaultEmail(e.currentTarget.checked)} id="flexCheckDefault" />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            Gebruik dit email om bevestigingsmails te sturen met mijn reservatie
                        </label>
                </div>
                <div className="input-group my-1">
                <span className="input-group-text">
                    <FaEnvelope fontSize={16} color={`black`}/>
                </span>
                    <div className="col-12 col-md-5">
                        <input type="text" value={email} onChange={e => setEmail(e.target.value)}
                               placeholder={`E-mail`} className="form-control"/>
                    </div>
                </div>
            </div>
        </form>
    )

}

export default Registration;