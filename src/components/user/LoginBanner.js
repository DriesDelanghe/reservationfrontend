const LoginBanner = ({credentials}) => {
    return  (
         <div className="container mx-auto bg-light mt-2 p-2 rounded-2 border">
             {credentials.role !== `ANONYMOUS` ?
                 <p className="lead fs-5 ms-3 m-0 text-muted">Ingelogd als {credentials.username}</p> :
                 <p className="lead fs-5 ms-3 m-0 text-muted">U bent niet ingelogd</p>}
        </div>
    )
}

export default LoginBanner;