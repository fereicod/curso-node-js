const net = require('node:net') // sirve con conexiones tcp

function findAvailablePort(desiredPoprt){
    return new Promise((resovle, reject) => {
        const server = net.createServer()

        server.listen(desiredPoprt, () => {
            const { port } = server.address().port
            server.close(() => {
                resovle(port)
            })
        })

        server.on('error', (err) => {
            if(err.code === 'EADDRINUSE'){
                findAvailablePort(0).then(port => resovle(port))
            }else{
                reject(err)
            }
        })
    })
}

module.exports = { findAvailablePort }
