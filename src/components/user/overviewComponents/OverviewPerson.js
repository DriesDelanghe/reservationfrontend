import PropTypes from 'prop-types'

const OverviewPerson = ({person}) => {
    return(
            <p className={`ms-2 lead fs-6`}>{person.firstName} {person.lastName}</p>
    )
}

OverviewPerson.propTypes = {
    person: PropTypes.object
}

export default OverviewPerson;