const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const { response } = require('express')

require('dotenv').config()

const db = require('knex')({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: `${process.env.PASSWORD}`,
        database: 'smart-brain'
    }
});

const app = express()

app.use(bodyParser.json())
app.use(cors())


app.get('/', (req, res) => {
    // res.send(database.users)
})

app.post('/signin', (req, res) => {
    db.select('email', 'hash')
        .from('login')
        .where('email', '=', req.body.email)
        .then(data => {
            const isValid = bcrypt.compareSync(req.body.password, data[0].hash)
            if (isValid) {
                return db.select('*').from('users')
                    .where('email', '=', req.body.email)
                    .then(user => {
                        res.json(user[0])
                    })
                    .catch(err => res.status(400).json('unable to get user'))
            }
            else {
                res.status(400).json('wrong credentials')
            }
        })
        .catch(err => res.status(400).json('wrong credentials'))

})

app.post('/register', (req, res) => {
    const { email, name, password } = req.body
    const hash = bcrypt.hashSync(password)
    db.transaction(trx => {
        trx.insert({
            hash,
            email
        })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                return trx('users')
                    .returning('*')
                    .insert({
                        email: loginEmail[0],
                        name,
                        joined: new Date()
                    })
                    .then(user => {
                        console.log(user)
                        res.json(user[0])
                    })
            })
            .then(trx.commit)
            .catch(trx.rollback)
    })
        .catch(err => res.status(400).json(err))
})

app.get('/profile/:id', (req, res) => {
    const { id } = req.params

    db.select('*')
        .from('users')
        .where({ id })
        .then(user => {
            user.length ? res.json(user[0]) : res.status(400).json('Not Found')
        })
        .catch(err => {
            res.status(400).json('Error Getting User')
        })
})

app.put('/image', (req, res) => {
    const { id } = req.body
    db('users')
        .where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0])
        })
        .catch(err => {
            res.status(400).json('unable to get entries')
        })
})


app.listen(3000, () => {
    console.log('app is listening on port 3000')
})