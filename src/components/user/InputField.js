import PropTypes from 'prop-types'

const InputField = ({type, name, value, placeholder, id, text}) => {
    if (type === 'checkbox'){
        return(
            <div className="form-check">
            <input type={type} name={name} value={value} id={id} className='form-check-input'/>
            <label htmlFor={id} className='form-check-label'>{text}</label>
        </div>
        )
    }
    return <input type={type} name={name} id={id} value={value || ""} placeholder={placeholder} className='form-control'/>
}

InputField.defaultProps = {
    value: '',
    type: 'text'
}

InputField.propTypes = {
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    id: PropTypes.string
}

export default InputField;