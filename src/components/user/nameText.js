import RemoveButton from "./removeButton";
import PropTypes from 'prop-types'

const NameText = ({person, onRemove}) => {
    return (
        <div className="input-group my-3">
            <span className="input-group-text col-10 col-md-8 col-lg-6 bg-transparent border p-3 m-0 shadow-sm">{person.firstName} {person.lastName}</span>
            <RemoveButton onRemove={onRemove} id={person.id || person.localid} />
        </div>
    )
}

NameText.propTypes ={
    onRemove: PropTypes.func
}

export default  NameText;