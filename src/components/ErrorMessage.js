const ErrorMessage = ({text}) => {
    return (
        <div className="container mx-auto">
            <div className="alert alert-danger error-message shadow">
                <p className="m-0 lead">{text}</p>
            </div>
        </div>
    )
}

export default ErrorMessage;