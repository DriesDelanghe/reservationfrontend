import {Breadcrumb} from "react-bootstrap";
import PropTypes from 'prop-types'
import {useHistory} from "react-router-dom";

const BreadCrumbs = ({nameAndLink, setNameAndLink}) => {

    const history = useHistory()

    const goToPage = (e, link) => {
        e.preventDefault()
        if (link === '/admin'){
            const nameLink = [{name:'Homepage',link:'/admin'}]
            setNameAndLink(nameLink)
        }
        history.push(link)

    }

    return(nameAndLink[0] ?
                <Breadcrumb className={'mx-3'}>
                    {nameAndLink.map((nameLinkItem, index) =>
                        (index === nameAndLink.length-1) ? <Breadcrumb.Item key={index} active>{nameLinkItem.name}</Breadcrumb.Item> :
                            <Breadcrumb.Item onClick={(e) => goToPage(e, nameLinkItem.link)} key={index}>{nameLinkItem.name}</Breadcrumb.Item>
                    )}
                </Breadcrumb>
        :
                <Breadcrumb>
                    <Breadcrumb.Item active>Home</Breadcrumb.Item>
                </Breadcrumb>

    )
}

BreadCrumbs.propTypes = {
    nameAndLink: PropTypes.arrayOf(PropTypes.array)
}
export default BreadCrumbs