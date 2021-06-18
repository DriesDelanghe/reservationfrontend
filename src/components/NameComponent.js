import InputGroupNames from "./inputGroupNames";
import NameText from "./nameText";

const NameComponent = ({ onAdd, people, onRemove,  firstName, setFirstName, lastName, setLastName, nameNotEmpty, setNameNotEmpty }) => {

    return(
    <div className='container mx-auto border shadow-sm rounded-2 mt-5 p-3'>
        <h2 className="display-6 fs-5">Personen:</h2>
          <InputGroupNames placeholder1={'Voornaam'} placeholder2={'Achternaam'} name1={'firstName'} name2={'lastName'} onAdd={onAdd}
          firstName={firstName} lastName={lastName} setFirstName={setFirstName} setLastName={setLastName} nameNotEmpty={nameNotEmpty}
          setNameNotEmpty={setNameNotEmpty}/>
        {people.map((person) => (
            <NameText key={person.localid} person={person} onRemove={onRemove} />
        ))}
    </div>)
}

export default NameComponent;