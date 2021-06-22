import Datefield from "./Datefield";


const OverviewDates = ({dates}) => {
    return (
        <div className={`container my-3`}>
            <h2 className="display-6 fs-6">Geselecteerde data:</h2>
            {dates.map((dateObject, index) => <Datefield key={index} dateObject={dateObject}/>)}
        </div>
    )
}

export default OverviewDates;