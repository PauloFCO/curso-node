const http = require('node:http')
const { findAvailablePort } = require('./10.free-port')


const server = http.createServer((req, res) => {
	console.log('request received')
	res.end('Hola mundo')
})

findAvailablePort(2332).then(port => {
	server.listen(port, () => {
		console.log(`server listening on port http://localhost:${server.address().port}`)
	})
})

