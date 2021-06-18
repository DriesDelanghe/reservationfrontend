

const OverviewEmail = ({email}) => {
    return (
        <div className="container">
            <h2 className="display-6 fs-6">E-mail:</h2>
            <p className="lead fs-6 ms-2">{email.email}</p>
        </div>
    )
}

export default OverviewEmail;