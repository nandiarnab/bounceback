const mongoose = require('mongoose')

const learnerSchema = new mongoose.Schema({
    forename: String,
    surname: String,
})

const Learner = mongoose.model('Learner', learnerSchema)

exports.home = function(req, res) {
    res.render("learner/home")
}

exports.create = function(req, res) {
    res.render("learner/create")
}

exports.save = function(req, res) {
    console.log(req.body)
    res.status(200).send('OK')
}