import PropTypes from 'prop-types'

const OverviewPerson = ({person}) => {
    return(
        <div className="container border bg-light rounded-2 my-2 p-2">
            <span>{person.firstName} {person.lastName}</span>
        </div>
    )
}

OverviewPerson.propTypes = {
    person: PropTypes.object
}

export default OverviewPerson;