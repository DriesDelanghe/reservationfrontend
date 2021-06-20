const LoginBanner = ({credentials}) => {
    return  (
        credentials.role !== `ANONYMOUS` ? <div className="container mx-auto bg-light mt-2 p-2 rounded-2 border">
            <p className="lead fs-5 ms-3 m-0 text-muted">Ingelogd als {credentials.username}</p>
        </div> : null
    )
}

export default LoginBanner;