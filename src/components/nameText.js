import RemoveButton from "./removeButton";
import PropTypes from 'prop-types'

const NameText = ({person, onRemove}) => {
    return (
        <div className="input-group m-2">
            <span className="input-group-text col-10 col-md-8 col-lg-6 bg-light border">{person.firstName} {person.lastName}</span>
            <RemoveButton onRemove={onRemove} id={person.id} />
        </div>
    )
}

NameText.propTypes ={
    onRemove: PropTypes.func
}

export default  NameText;