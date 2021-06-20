import {Link, useHistory} from "react-router-dom";
import 'bootstrap'
import {FaSignInAlt, FaSignOutAlt} from "react-icons/all";

const Header = ({credentials, doLogout}) => {

    const history = useHistory()

    const performLogout = () => {
        doLogout()
        history.push('/logout')
    }

    return <header className='position-sticky top-0 w-100 bg-light border shadow-sm' style={{zIndex:2048}}>
        <nav className="navbar navbar-light bg-light">
            <div className="container-fluid d-flex justify-content-between">
                <Link to="/" className="navbar-brand">Tjok Hove</Link>
                {credentials.role !== `ANONYMOUS` ?
                    <Link to={'/logout'} className={`text-black`}>
                    <FaSignOutAlt color={"black"} fontSize={26} className={`me-3`} onClick={() => performLogout()}/>
                    </Link>
                    :
                    <Link to={'/login'} className={`text-primary`}>
                        <FaSignInAlt fontSize={26} className={`me-3`}/>
                    </Link>
                }
            </div>
        </nav>
    </header>
}

export default Header;