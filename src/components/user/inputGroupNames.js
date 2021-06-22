import InputField from "./InputField";
import PropTypes from 'prop-types'
import {useState} from 'react'


const InputGroupNames = ({name1, name2, placeholder1, placeholder2, type, onAdd, firstName, setFirstName, lastName, setLastName , nameNotEmpty, setNameNotEmpty }) => {



    const onSubmit = (e) => {
        e.preventDefault();

        if (!firstName) {
            document.getElementById(name1).classList.add('alert-danger');
        }else{
            document.getElementById(name1).classList.remove('alert-danger');
        }
        if (!lastName){
            document.getElementById(name2).classList.add('alert-danger');
        }else{
            document.getElementById(name2).classList.remove('alert-danger');
        }
        if (!firstName || !lastName){
            return
        }
        onAdd( {firstName, lastName} );
        setNameNotEmpty(false);
        setFirstName('')
        setLastName('')
    }

    return (
        <form className='mb-3 p-2 row' id={'containerName'} onSubmit={onSubmit}>
            <div className="input-group w-auto col-10 col-md-8 col-lg-6">
                <input id={name1} name={name1} value={firstName} onChange={(e) => {
                    setFirstName(e.target.value)
                }} className={nameNotEmpty ? 'form-control alert-danger' : 'form-control'} placeholder={placeholder1} type={type}/>
                <input id={name2} name={name2} value={lastName} onChange={(e) => {
                    setLastName(e.target.value)
                }} className={nameNotEmpty ? 'form-control alert-danger' : 'form-control'} placeholder={placeholder2}
                            type={type}/>
            </div>
            <div className="d-flex justify-content-start mt-3 ps-2">
            <input type={'submit'} value={'toevoegen'} className={'btn btn-success w-auto'}/>
            </div>
        </form>)
}

InputField.defaultProps = {
    type: 'text',
    name1: 'firstName',
    name2: 'lastName',
    placeholder1: 'Voornaam',
    placeholder2: 'Achternaam'
}

InputField.propTypes = {
    name1: PropTypes.string,
    name2: PropTypes.string,
    placeholder1: PropTypes.string,
    placeholder2: PropTypes.string,
    id1: PropTypes.string,
    id2: PropTypes.string,
    type: PropTypes.string,
    onAdd: PropTypes.func
}

export default InputGroupNames;