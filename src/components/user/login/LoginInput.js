import {useEffect, useState} from "react";
import {FaEyeSlash, FaEye} from "react-icons/all";


const LoginInput = ({ type, name, placeholder, setCredentials, credentials }) => {

    const [passwordShow, setPasswordShow] = useState();
    const [inputType, setType] = useState(type);

    const updatePassword = (value) => {
        setCredentials({...credentials, password:value})
    }

    const updateUsername = (value) => {
        setCredentials({...credentials, username: value})
    }

    useEffect(() => {
        if (passwordShow) {
            setType('text')
            return
        }
        setType('password')
    }, [passwordShow])

    if (type === 'password') {
        return (
            <div className="input-group">
                <input type={inputType} placeholder={placeholder} className={`form-control`} name={name}
                       onChange={(e) => updatePassword(e.target.value)}/>
                <span className="input-group-text" onClick={() => setPasswordShow(!passwordShow)}>
                    {passwordShow ? <FaEyeSlash/> :
                        <FaEye/>}
                </span>
            </div>
        )
    }

    return (
        <input type={type} placeholder={placeholder} name={name} className={`form-control`}
        onChange={(e) => updateUsername(e.target.value)}/>
    )
};

export default LoginInput;