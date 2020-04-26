const mongoose = require('mongoose')

if ( process.argv.length<3 ) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://fullstack:${password}@cluster0-zxvii.mongodb.net/command-line-app?retryWrites=true&w=majority`


mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema
({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)


const person = new Person
({
    name: name,
    number: number,
})
  
//if all arguments are provided, then save the new Person to the db.
//If only password given, display all entries in the phonebook db
if (process.argv.length === 5) 
{
    person.save().then(response =>
    {
        console.log('person saved!')
        mongoose.connection.close()
    })
} 
else if (process.argv.length === 3) 
{
    console.log('phonebook:')
    Person.find({}).then(response => 
    {
        response.forEach(person => 
        {
            console.log(person.name, person.number)
        });
        mongoose.connection.close()
    })
}
