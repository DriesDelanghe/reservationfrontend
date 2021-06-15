import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Header from './components/header'
import Reservation from "./pages/reservation";
import Overview from "./pages/overview";

function App() {
    return <Router>
            <Header/>
            <Switch>
                <Route exact path="/" component={Reservation} />
                <Route exact path="/overview" component={Overview} />
            </Switch>
        </Router> ;
}

export default App;
