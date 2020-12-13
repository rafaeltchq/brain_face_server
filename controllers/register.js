
const handleRegister = (req, res, db, bcrypt) => {
const { email, name, password } = req.body;
    if (email && name && password) {
        bcrypt.hash(password, 10)
        .then(hash => {
            db.transaction(trx => {
                return trx.insert({
                    email: email,
                    hash: hash
                })
                .into('login')
                .returning('email')
                .then(loginEmail => {
                    return trx('users')
                    .returning('*')
                    .insert({
                        email: loginEmail[0],
                        name: name,
                        entries: 0,
                        joined: new Date()
                    })
                    .then(user => {
                        res.json(user[0]);
                    })
                })
                .then(trx.commit)
                .catch(trx.rollback)
            })
        .catch(err => res.status(400).json('Unable to register'))
    })
    } else res.status(400).json('Bad request');
};
module.exports = {
    handleRegister: handleRegister
}