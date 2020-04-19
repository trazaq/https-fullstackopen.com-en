import React from 'react'

const Numbers = ({person, deletePerson}) =>
{
    return(
        <tr>
            <td>{person.name}</td>
            <td>{person.number}</td>
            <td><button type="button" onClick={() => deletePerson(person)}>delete</button></td>
        </tr>
    )
}
export default Numbers