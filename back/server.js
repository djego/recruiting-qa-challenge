const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors')
const passwordService = require('./password')
const emailService = require('./email')

app.use(cors())
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)

const middleware = (req, res, next) => {
  const { email, password } = req.body
  !email || !password
    ? res.status(422).json({
        code: 999,
        msg: 'REQUIRED'
      })
    : next()
}

app.post('/register', middleware, (req, res) => {
  const { email, password } = req.body
  passwordService.length(password) > 6 && emailService.validate(email)
    ? res.json({
        code: 201,
        msg: 'SAVED'
      })
    : res.status(422).json({
        code: 998,
        msg: 'INVALID'
      })
})

app.post('/login', middleware, (req, res) => {
  const { email, password } = req.body
  email === 'correo@kambista.com' && password === 'password'
    ? res.json({
        code: 201,
        msg: 'LOGIN'
      })
    : res.status(401).json({
        code: 997,
        msg: 'INVALID'
      })
})

app.listen(port, () => {
  console.log('Server listen port: ', port)
})
