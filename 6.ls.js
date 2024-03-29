const fs = require('node:fs')

fs.readdir('.', (err, files) => {
    if(err){
        console.err('Error al leer el directorio: ', err)
        return;
    }

    files.forEach(file => {
        console.log(file)
    })
})

// Utilizando promises
const fs = require('node:fs/promises')

fs.readdir('.')
    .then(files => {
        files.forEach(file => {
            console.log(file)
        })
    })
    .catch(err => {
        if(err){
            console.err('Error al leer el directorio: ', err)
            return;
        }
    })
