const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes')
const cors = require('cors')

const app = express()

mongoose.connect('url for mongo_database',{
  useNewUrlParser: true,
  useUnifiedTopology: true
})

app.use(cors())
app.use(express.json()) //dando a entender ao express que as requisições serão no formato JSON
app.use(routes)


app.listen(3333) //ouvindo o express na porta 3333
