import {Link, BrowserRouter as Router} from "react-router-dom";
import 'bootstrap'

const Header = () => {
    return <header className='position-fixed w-100 bg-light'>
        <nav className="navbar navbar-light bg-light">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">Tjok Hove</Link>
            </div>
        </nav>
    </header>
}

export default Header;