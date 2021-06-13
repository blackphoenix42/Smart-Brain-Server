const handleRegister = (db, bcrypt) => (req, res,) => {
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
}

module.exports = {
    handleRegister
}