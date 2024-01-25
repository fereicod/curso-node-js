const http = require('node:http')

const desiredPoprt = process.env.PORT ?? 1234

const server = http.createServer((req, res) => {
    console.log('request received')
    res.end('Hola mundo')
})

server.listen(desiredPoprt, () => {
    console.log(`server listening on port http://localhost:${desiredPoprt}`)
})
