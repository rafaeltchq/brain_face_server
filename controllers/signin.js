const handleSignin = (req, res, db, bcrypt) =>{
    const { email, password } = req.body;
    db.select('email', 'hash').from('login')
    .where('email', '=', email)
    .then(data => {
        bcrypt.compare(password, data[0].hash, function(err, result) {
            return result ?
            db.select('*').from('users')
            .where('email', '=', email)
            .then(user => {
                res.json(user[0])
            }) :
            res.status(400).json('Email/Password is wrong')
        })
    }).catch(err => res.status(400).json('Wrong credentials'));
}
module.exports = {
    handleSignin: handleSignin
}