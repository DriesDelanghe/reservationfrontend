import OverviewPeople from "./overviewPeople";

const OverviewField = ({object}) => {

    return (
        <div className="container mx-auto border shadow-sm p-3 my-3">
            <h2 className="display-6 fs-5">Reservatie {object.reservationDate}</h2>
            {object.personList ? <OverviewPeople people={object.personList}/> : null}
        </div>
    )
}
export default OverviewField;