import LoginInput from "./LoginInput";

const LoginForm = ({ credentials, setCredentials, performLogin }) => {

    return (
        <div className={`container mx-auto mt-5 p-3 border shadow d-flex flex-column`}>
            <label>
                <span>Email</span>
                <LoginInput type={`text`} name={`username`} placeholder={`Email`} setCredentials={setCredentials}
                            credentials={credentials}/>
            </label>
            <label>
                <span>Wachtwoord</span>
                <LoginInput type={`password`} name={`password`} placeholder={`wachtwoord`}
                            setCredentials={setCredentials} credentials={credentials}/>
            </label>
            <div className="container">
                <button type={`button`} className={`btn btn-dark mt-3 ms-2`}
                onClick={(e) => performLogin(e)}>
                    Inloggen
                </button>
            </div>
        </div>
    )
}

export default LoginForm;