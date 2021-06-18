import PropTypes from 'prop-types'
import OverviewPerson from "./OverviewPerson";

const OverviewPeople = ({people}) => {
    return(
        <div className="container">
            <h2 className="display-6 fs-6">Aanwezigen:</h2>
            {people ? people.map((person, index) => <OverviewPerson key={index} person={person} />) : null}
        </div>
    )
}

export default OverviewPeople;