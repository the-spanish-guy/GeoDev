module.exports = function parserStringAsArray(arrayAsString) {
    return arrayAsString.split(',').map(str => str.trim())
}