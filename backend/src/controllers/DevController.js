const axios = require('axios')
const Dev = require('../models/Dev')
const parserStringAsArray = require('../utils/parserStringAsArray')

module.exports = {

  async index(req, res) {
    const devs = await Dev.find()

    return res.json({devs})
  },

  async store(req, res) {
    console.log('body',req.body)
    const { github_username, techs, latitude, longitude } = req.body
  
    let dev = await Dev.findOne({ github_username })

    if (!dev) {
      const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`)
      console.log('api: ',apiResponse.data)
    
      const { name = login, avatar_url, bio } = apiResponse.data
      console.log(name, avatar_url, bio, github_username)
    
      const techsArray = parserStringAsArray(techs)
    
      //pro mongo a  longitude tem que vir primeiro
      const location = {
        type: 'Point',
        coordinates: [longitude, latitude]
      }
    
      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location,
      })
    }
  
    return res.json({dev})
  }
}