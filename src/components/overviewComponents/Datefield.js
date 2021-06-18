

const Datefield = ({dateObject}) => {
    return (
        <p className={`ms-2 lead fs-6`}>{dateObject.openingDate}:
            <span className={`ms-2`}>{dateObject.openingHour} - {dateObject.closingHour}</span>
            </p>
    )
}

export default  Datefield;