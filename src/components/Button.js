import PropTypes from 'prop-types'

const Button = ({onClick, text, btnColor}) => {
    return (
        <button type="button" onClick={onClick} className={`btn ${btnColor}`}>{text}</button>
    )
}

Button.propTypes = {
    onClick: PropTypes.func,
    text: PropTypes.string,
    btnColor: PropTypes.string
}

export default Button;