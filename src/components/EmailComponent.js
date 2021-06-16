import EmailField from "./EmailField";
import {PropTypes} from 'prop-types'

const EmailComponent = ({email, onChangeEmail, confirmation, setConfirmation }) => {

    return (
        <div className={'container mx-auto border shadow-sm rounded-2 my-5 p-3'}>
            <div className="form-check">
                <input type="checkbox" id="confirmCheck" className="form-check-input keep"
                       onChange={(e) => setConfirmation(e.currentTarget.checked)} checked={confirmation}/>
                <label htmlFor="confirmCheck" className="form-check-label">Ik wil graag een bevestigingsmail
                    krijgen</label>
            </div>
            <EmailField confirmation={confirmation} email={email} onChangeEmail={onChangeEmail}/>
        </div>
    )
}

EmailComponent.propTypes = {
    email: PropTypes.object,
    onChangeEmail: PropTypes.func,
    confirmation: PropTypes.bool,
    setConfirmation: PropTypes.func
}

export default EmailComponent;