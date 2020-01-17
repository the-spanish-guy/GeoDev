const Dev = require('../models/Dev')
const parserStringAsArray = require('../utils/parserStringAsArray')

module.exports = {
  async index(req, res) {
    console.log(req.query)
    const { latitude, longitude, techs } = req.query
    //buscar todods os devs no raio de 10km
    //filtrar por tecnologias
    const techsArays = parserStringAsArray(techs)
    console.log(techsArays)

    const devs = await Dev.find({
      techs: {
        $in: techsArays
      },
      location: {
        $near: {
          $geometry:{
            type: 'Point',
            coordinates: [longitude, latitude]
          },
          $maxDistance: 10000
        }
      }
    })

    return res.json({ devs })
  }
}