const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const errorHandler = require('errorhandler')

const homeController = require('./controllers/home.js')
const learnerController = require('./controllers/learner.js')

const app = express()

app.set('host', '0.0.0.0')
app.set('port', '8080')
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use('/', express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }))
app.use('/img', express.static(path.join(__dirname, 'public/img'), { maxAge: 31557600000 }))
app.use('/js/lib', express.static(path.join(__dirname, 'node_modules/popper.js/dist/umd'), { maxAge: 31557600000 }))
app.use('/js/lib', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js'), { maxAge: 31557600000 }))
app.use('/js/lib', express.static(path.join(__dirname, 'node_modules/jquery/dist'), { maxAge: 31557600000 }))
app.use('/webfonts', express.static(path.join(__dirname, 'node_modules/@fortawesome/fontawesome-free/webfonts'), { maxAge: 31557600000 }))

app.get('/', homeController.index)
app.get('/learner/home', learnerController.home)
app.get('/learner/create', learnerController.create)
app.post('/learner/create', learnerController.save)

if (process.env.NODE_ENV === 'development') {
    app.use(errorHandler())
}

app.listen(app.get('port'), () => {
    console.log("App is running on  %d in %s mode", app.get('port'), app.get('env'))
    console.log('Press CTRL-C to stop\n')
})

module.exports = app

