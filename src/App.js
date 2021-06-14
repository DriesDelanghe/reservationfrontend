import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import Header from './components/header'
import Reservation from "./pages/reservation";
import Overview from "./pages/overview";

function App() {
    return (
        <Router>
            <Header/>
            <Switch>
                <Route path="/">
                  <Reservation />
                </Route>
                <Route path="/overview">
                    <Overview />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
