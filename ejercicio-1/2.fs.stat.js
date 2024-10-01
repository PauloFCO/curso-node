const fs = require('node:fs')

const stats = fs.statSync('./archivo.txt')
console.log(
  stats.isFile(),
	stats.isDirectory(),
	stats.isSymbolicLink(), // si es un enlace simbólico
	stats.size // tamaño en bytes
)