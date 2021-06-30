import {FormControl, InputGroup} from "react-bootstrap";
import PropTypes from 'prop-types'
import {FaPencilAlt} from "react-icons/all";


const ReservationInput = ({text, FaSymbol, type, setter, value, className}) => {

    return(
        <label className={"my-2 mx-0 " + className}>
            <p className="lead m-0 mb-1">{text}</p>
            <InputGroup className={'mb-3'}>
                <InputGroup.Text>
                    {FaSymbol}
                </InputGroup.Text>
                <FormControl type={type} onChange={(e) => setter(e.target.value)} value={value}/>
            </InputGroup>
        </label>
    )
}

ReservationInput.defaultProps = {
    text: 'placeholder title',
    FaSymbol: <FaPencilAlt/>,
    type: 'text',
    className: ''
}

ReservationInput.propTypes = {
    text: PropTypes.string,
    FaSymbol: PropTypes.element,
    type: PropTypes.string,
    setter: PropTypes.func,
    value: PropTypes.string
}

export default ReservationInput