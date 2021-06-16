

const RemoveButton = ({id, onRemove}) => {

    return (
        <button type='button' onClick={() => onRemove(id)} className='btn col-2 col-md-1 rounded-3 bg-light text-muted border shadow-sm dark-hover'>
            <i className={'fas fa-times'}></i>
        </button>
    )
}

export default RemoveButton;