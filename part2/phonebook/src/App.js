import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Numbers from './components/Numbers'
import AddPersonForm from './components/AddPersonForm'
import AddNotification from './components/AddNotification'
import phonebookService from './services/phonebook'

//const SearchResults = ({ person }) => <p>{person.name} {person.number}</p>


const App = () =>
{

    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newSearch, setNewSearch] = useState('')
    const [addNotificationMsg, setAddNotificationMsg] = useState(null)

    //Only execute matches() if there's a value present in newSearch
    //Otherwise this will get executed every render
    const matches = () => 
    {
        if (newSearch !== '') {
            return persons.filter(person => 
                (person.name)
                .toLowerCase()
                .match((newSearch === '') ? "^ .*$" : `^${(newSearch).toLowerCase()}.*$`)
            )
        } else {
            return []
        }
           
    }

    const addPerson = (event) =>
    {
        event.preventDefault();

        //Prevent a new name from being added if it's already present
        //some() only interates until it finds a match then breaks...more efficient 
        if (persons.some(person => person.name === newName))
        {
            alert(newName + " is already added to the phonebook")
        } else 
        {
            const newPersonObj =
            {
                name: newName,
                number: newNumber
            }
            phonebookService
                .create(newPersonObj)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson.data))
            })

            setNewName('')
            setNewNumber('')
            setNewSearch('')
            
            setAddNotificationMsg(
                `Added ${newPersonObj.name}`
            )
            setTimeout(() => {
                setAddNotificationMsg(null)
            }, 4000)
        }

        
    }

    const deletePerson = (person) =>
    {
        //e.preventDefault()
        let id = person.id
        //console.log(id)
       // const person = persons.find(person => person.id === id)
       if (window.confirm(`Delete ${person.name} ?`) === true) 
       {
            phonebookService
            .remove(id)
            .then(() => {
                setPersons(persons.filter(person => person.id !== id))
            })
            .catch(error => 
            {
                console.log(error)
            })
       }
    }

    const handleNameChange = (e) =>
    {
        setNewName(e.target.value)
    }

    const handleNumberChange = (e) =>
    {
        setNewNumber(e.target.value)
    }

    const handleSearchChange = (e) =>
    {
        setNewSearch(e.target.value)
    }

    /*
    useEffect(() => {
        axios
          .get('http://localhost:3001/persons')
          .then(response => {
            setPersons(response.data)
          })
    }, [])
    */

    useEffect(() => {
        phonebookService
            .getAll()
            .then(response => {
                setPersons(response.data)
            })
    }, [])
    
    return (
        <div>
            <h2>Phonebook</h2>
            <AddNotification message={addNotificationMsg} />
            <div>
                filter shown with: <input type="text" value={newSearch} onChange={handleSearchChange} />
            </div>
            <br></br>
                <AddPersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
            <h2>Numbers</h2>
            <table>
                <tbody>{persons.map(person => <Numbers key={person.id} person={person} deletePerson={deletePerson} />)}</tbody>
            </table>
            <div>
                <h2>Search Results</h2>
                {matches().map(person => <Filter key={person.name} person={person} />)}
            </div>
        </div>
    )
}

export default App