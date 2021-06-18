import OverviewPeople from "./overviewPeople";
import OverviewDates from "./OverviewDates";
import OverviewEmail from "./OverviewEmail";

const OverviewField = ({object}) => {

    return (
        <div className="container mx-auto border shadow-sm p-3 my-3">
            <h2 className="display-6 fs-5 fw-normal mx-auto">Reservatie {object.reservationDate}</h2>
            {object.personList ? <OverviewPeople people={object.personList}/> : null}
            {object.openingDateList ? <OverviewDates dates={object.openingDateList}/> : null}
            {object.confirmation ? <OverviewEmail email={object.email} /> : null }
        </div>
    )
}
export default OverviewField;