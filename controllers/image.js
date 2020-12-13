const Clarifai = require('clarifai');

const app = new Clarifai.App({apiKey: 'a628701becb449beb69be42d03b06516'});

const handleApiCall = (req, res) => {
    app.models.predict({id:'d02b4508df58432fbb84e800597b8959'}, req.body.imageUrl)
    .then(data => {
        res.json(data)})
    .catch(err => res.status(400).json('Error in Clarifai API'))
}
const handleImage = db => (req, res) => {
    const { id, faces } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', faces)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json('Unable to update'));
}
module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
}