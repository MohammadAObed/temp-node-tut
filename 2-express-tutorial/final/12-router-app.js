//express router: group routers together, functionality: set them up as seperate controllers
//express controllers, has the routers functionality.

//MVC Model - View - Controller

//Controllers -> routes -> app.js -> frontend    //BEST EXPLANATION

const express = require('express')
const app = express()

const people = require('./routes/people')
const auth = require('./routes/auth')

// static assets
app.use(express.static('./methods-public'))
// parse form data
app.use(express.urlencoded({ extended: false }))
// parse json
app.use(express.json())

app.use('/api/people', people)
app.use('/login', auth)

app.listen(5000, () => {
  console.log('Server is listening on port 5000....')
})
