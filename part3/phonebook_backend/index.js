const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
const Person = require('./models/person')


const app = express()

app.use(express.static('build'))
app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))


let persons =
[
  {
    'name': 'Arto Hellas',
    'number': '040-123456',
    'id': 1
  },
  {
    'name': 'Ada Lovelace',
    'number': '39-44-5323523',
    'id': 2
  },
  {
    'name': 'Dan Abramov',
    'number': '12-43-234345',
    'id': 3
  },
  {
    'name': 'Mary Poppendieck',
    'number': '39-23-6423122',
    'id': 4
  }
]


app.get('/api/persons', (req, res) =>
{
  Person.find({}).then(persons =>
  {
    res.json(persons.map(person => person.toJSON()))
  })
})


app.get('/info', (req, res) =>
{
  let entries = () => persons.length
  let sysDate = () => new Date().toString()

  res.send(`<p>Phone has info for ${entries()} people</p><p>${sysDate()}</p>`)
})


app.post('/api/persons', (req, res) =>
{
  //const id = Math.floor(Math.random() * (200 - 20)) + 20
  let person = req.body
  if (!person)
  {
    res.status(400).json({ 'error':'missing content' })
  }
  else if (person.name === '' || person.number === '')
  {
    res.status(400).json({ 'error':'missing name or number' })
  }
  else
  {
    //person.id = id;
    // persons = persons.concat(person)
    const newPerson = new Person(
      {
        name: person.name,
        number: person.number,
      })
    newPerson.save().then(savedPerson =>
    {
      res.json(savedPerson.toJSON())
    })
  }

})

app.get('/api/persons/:id', (req, res) =>
{
  //find the person with the matching id in the incoming request
  let person = persons.find(person => person.id === Number(req.params.id))
  //if the id exists, sends the person as a json string otherwise send a 404
  if (person) {res.json(person)} else {res.status(404).end()}

})

app.delete('/api/persons/:id', (req, res, next) =>
{
  //find the person with the matching id in the incoming request
  //persons = persons.filter(person => person.id !== Number(req.params.id))
  //if the id exists, sends the person as a json string otherwise send a 404
  //res.status(204).end()

  Person.findByIdAndDelete(req.params.id)
    .then(() =>
    {
      res.status(204).end()
    })
    .catch(error => next(error))


})

const unknownEndpoint = (req, res) =>
{
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) =>
{
  console.error(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId')
  {
    return res.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

app.use(errorHandler)

app.listen(process.env.PORT)

console.log('Server running on port 3001')



