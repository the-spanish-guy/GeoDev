const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes')
const cors = require('cors')
const http = require('http')
const { setWebSocket } = require('./websocket')
require('dotenv/config')

const app = express()
const server = http.Server(app)

setWebSocket(server)

mongoose.connect(process.env.DB_MONGO,{
  useNewUrlParser: true,
  useUnifiedTopology: true
})

app.use(cors())
app.use(express.json()) //dando a entender ao express que as requisições serão no formato JSON
app.use(routes)


server.listen(3333) //ouvindo o express na porta 3333
