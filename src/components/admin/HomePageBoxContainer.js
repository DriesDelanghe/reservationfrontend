import HomePageBox from "./HomePageBox";

const HomePageBoxContainer = () => {

    const ReservationInfo = "Op deze pagina staat het overzicht van de reservaties per dag"
    const OpeningDatesInfo = "Op deze pagina staat een overzicht van alle dagen die momenteel opgegeven staan als openingsdagen, hier kan je de dagen wijzigen, dagen op inactief zetten en de daglimiet instellen"

    return (
        <div className="container mt-3 mx-auto">
            <div className="row justify-content-center">
                <HomePageBox text={"Reservaties"} pageName={"Reservaties"} path={"/admin/reservations"} extraInfo={ReservationInfo}/>
                <HomePageBox text={"Openingsdagen"} pageName={"Openingsdagen"} path={"/admin/openingdates"} extraInfo={OpeningDatesInfo}/>
            </div>
        </div>
    )
}

export default HomePageBoxContainer;