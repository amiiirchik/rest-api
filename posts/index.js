const app = require('express')()
const bodyParser = require('body-parser')
const posts = require('./src/post/routes')

app.use(
bodyParser.urlencoded({
extended: true,
})
)
app.use(bodyParser.json())

app.use('/posts', posts)

app.use(function(req, res, next) {
    res.status(404).send("Sorry, that route doesn't exist. Have a nice day :)")
})

app.listen(3000, function () {
    console.log('Example app listening on port 3000')
})
