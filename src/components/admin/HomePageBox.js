import {Link} from "react-router-dom";
import {FaArrowRight} from "react-icons/all";

const HomePageBox = ({text, path, pageName, extraInfo}) => {

    return (
        <div className="container d-flex flex-wrap align-items-start col-10 col-md-5 border rounded-2 shadow-sm p-3 my-3">
            <div className="w-100">
                <h1 className="display-6 text-center">{text}</h1>
                <p className={`mx-5 lead fs-6 text-muted mt-3 tex-center`}>{extraInfo}</p>
            </div>
            <div className="w-100 align-self-end justify-content-center d-flex">
            <Link to={path} className={`btn btn-dark mt-3`}>
                naar {pageName}
                <FaArrowRight/>
            </Link>
            </div>
        </div>
    )
}

export default HomePageBox;