import PropTypes from 'prop-types'

const EmailField = ({confirmation, email, onChangeEmail }) => {
    return (
        confirmation ?
            <div className="container mx-auto mt-3">
                <input type="text" className={`form-control`} placeholder={'email@example.com'} value={email.email}
                       onChange={(e) => onChangeEmail(e)}/>
            </div>
            : null
    )
}

EmailField.propTypes = {
    confirmation: PropTypes.bool,
    email: PropTypes.object,
    onChangeEmail: PropTypes.func
}

export default EmailField;