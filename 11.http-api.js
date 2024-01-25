const http = require('node:http')
const fs = require('node:fs')

const desiredPort = process.env.PORT ?? 3001

const processRequest = (req, res) => {
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.statusCode = 200

    if(req.url === '/'){
        res.end('<h1>Hola mundo, esta es mi página con NodeJS!</h1>')

    }else if(req.url === '/contacto'){
        res.end('<h1>Contacto</h1>')

    }else if(req.url === '/nodejs.png'){
        fs.readFile('./nodejs.png', (err, data)=>{
            if(err){
                res.statusCode = 500
                res.end("<h1>500 Internal Server Error</h1>")
            }else{
                res.setHeader('Content-Type', 'image/png') //importante solo poner este content-type si funciona
                res.end(data) // node es capaz de canalizar el stream de datos, por ejemplo esto es un buffer de datos
            }
        })
    }else{
        res.statusCode = 404
        res.end('<h1>Not Found</h1>')
    }
}

const server = http.createServer(processRequest)

server.listen(desiredPort, () => {
    console.log(`server listening on port http://localhost:${desiredPort}`)
})
