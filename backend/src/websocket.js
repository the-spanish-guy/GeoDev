const socketio = require('socket.io')
const parserStringAsArray = require('./utils/parserStringAsArray')
const calculateDistance = require('./utils/calculateDistance')

const connection = []
let io
exports.setWebSocket = ( server ) =>{

  console.log('ok')

  io = socketio(server)

  io.on('connection', socket => {
    const { latitude, longitude, techs } = socket.handshake.query
    connection.push({
      id: socket.id,
      coordinates: {
        latitude: Number(latitude),
        longitude: Number(longitude)
      },
      techs: parserStringAsArray(techs)
    })
  })

}

exports.findConnections = (coordinates, techs) => {
  return connection.filter(connection => {
    //usando formula de haversine
    return calculateDistance(coordinates, connection.coordinates) < 10
      && connection.techs.some(item => techs.includes(item))
  })
}

exports.sendMessage = (to, message, data) => {
  to.forEach(connection => {
    io.to(connection.id).emit(message, data)
  });
}