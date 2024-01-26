const http = require('node:http')

const desiredPort = process.env.PORT ?? 3000

// commonJS -> modulos clásicos de node
const dittoJSON = require('./pokemon/ditto.json')

const processRequest = (req, res) => {
	// hacemos destructing de req
    const { method, url } = req

	// dependiendo del method hacemos un proceso por cada URL
    switch (method) {
        case 'GET':
            switch (url) {
                case '/pokemon/ditto':
				    // indicamos que devolvemos un tipo JSON y convertimos el json en string
                    res.setHeader('Content-Type', 'application/json; charset=utf-8')
                    return res.end(JSON.stringify(dittoJSON))

                default:
                    res.statusCode = 404
                    res.setHeader('Content-Type', 'text/html; charset=utf-8')
                    return res.end('<h1>404</h1>')
            }

        case 'POST':
            switch (url) {
                case '/pokemon': {
                    let body = ''

                    // escuchar el evento data
                    // el chunk es como trozos de la data
                    req.on('data', chunk => {
                        // y lo convertimos en String porque es un binario
                        body += chunk.toString()
                    })

                    // si termino de leer data escuchamos si termino
                    req.on('end', () => {
                        // podemos parsear a json
                        const data = JSON.parse(body)
                        // llamar a una base de datos para guardar la info (en este caso "guardamos")
                        res.writeHead(201, { 'Content-Type': 'application/json; charset=utf-8' })

                        // solo le agregamos un time para confirmar que si se proceso
                        data.timestamp = Date.now()

                        // enviamos los datos que "guardamos"
                        res.end(JSON.stringify(data))
                    })

                    break
                }

                default:
                    res.statusCode = 404
                    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
                    return res.end('404 Not Found')
            }
    }
}

const server = http.createServer(processRequest)

server.listen(desiredPort, () => {
    console.log(`server listening on port http://localhost:${desiredPort}`)
})
