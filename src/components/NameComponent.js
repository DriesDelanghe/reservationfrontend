import InputGroupNames from "./inputGroupNames";
import NameText from "./nameText";

const NameComponent = ({onAdd, people, onRemove}) => {

    return(
    <div className='container mx-auto border shadow-sm rounded-2 mt-5 p-3'>
        <h2 className="display-6 fs-5">Personen:</h2>
          <InputGroupNames placeholder1={'Voornaam'} placeholder2={'achterNaam'} name1={'firstName'} name2={'lastName'} onAdd={onAdd} />
        {people.map((person) => (
            <NameText key={person.id} person={person} onRemove={onRemove} />
        ))}
    </div>)
}

export default NameComponent;