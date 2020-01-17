const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes')

const app = express()

mongoose.connect('mongodb+srv://omnistack10:1234@omnistack-wssn5.mongodb.net/week10?retryWrites=true&w=majority',{
  useNewUrlParser: true,
  useUnifiedTopology: true
})

app.use(express.json()) //dando a entender ao express que as requisições serão no formato JSON
app.use(routes)


app.listen(3333) //ouvindo o express na porta 3333