import {Link} from "react-router-dom";
import 'bootstrap'
import {FaSignInAlt, FaSignOutAlt} from "react-icons/all";

const Header = ({credentials, doLogout}) => {
    return <header className='position-sticky w-100 bg-light border shadow-sm'>
        <nav className="navbar navbar-light bg-light">
            <div className="container-fluid d-flex justify-content-between">
                <Link to="/" className="navbar-brand">Tjok Hove</Link>
                {credentials.role ?
                    <FaSignOutAlt color={"black"} fontSize={26} className={`me-3`} onClick={() => doLogout()}/>
                    :
                    <Link to={'/login'}>
                        <FaSignInAlt fontSize={26} className={`me-3`}/>
                    </Link>
                }
            </div>
        </nav>
    </header>
}

export default Header;