const app = require('express')()
const bodyParser = require('body-parser')
const users = require('./src/user/routes')

app.use(
bodyParser.urlencoded({
extended: true,
})
)
app.use(bodyParser.json())

app.use('/users', users)

app.use(function(req, res, next) {
    res.status(404).send("Sorry, that route doesn't exist. Have a nice day :)")
})

app.listen(process.env.PORT, function () {
    console.log('Example app listening on port ' + process.env.PORT)
})