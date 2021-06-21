const ErrorMessage = ({text, className}) => {
    return (
        <div className={"container mx-auto " + className}>
            <div className={"alert alert-danger error-message shadow"}>
                <p className="m-0 lead">{text}</p>
            </div>
        </div>
    )
}

ErrorMessage.defaultProps = {
    className: ' ',
    text: 'An error occurred'
}

export default ErrorMessage;