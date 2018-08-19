const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const errorHandler = require('errorhandler')
const homeController = require('./controllers/home')

const app = express()

app.set('host', '0.0.0.0')
app.set('port', '3000')
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use('/', express.static(path.join(__dirname, 'public')))

app.get('/', homeController.index)

if (process.env.NODE_ENV === 'development') {
    app.use(errorHandler())
}

app.listen(app.get('port'), () => {
    console.log("App is running on  %d in %s mode", app.get('port'), app.get('env'))
    console.log('Press CTRL-C to stop\n')
})

module.exports = app

