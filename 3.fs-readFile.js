const fs = require('node:fs')

// Async (callbacks)
console.log("Leyendo el primero archivo...")
// de manera asyncrono, utilizando callback (err, arg) => {}
fs.readFile('./archivo.txt', 'utf-8', (err, text) => {
	console.log(text)
})

console.log("-> Hacer cosas mientras lee el archivo...")

console.log("Leyendo el segundo archivo...")
// de manera asyncrono
fs.readFile('./archivo2.txt', 'utf-8', (err, secondText) => {
	console.log(secondText)
})

console.log("-------------------------------")
// Native to Promise (sync to async)
const { promisify } = require('node:util')
const readFilePromise = promisify(fs.readFile)

console.log("Leyendo el primero archivo...")
// de manera Asyncrono
readFilePromise('./archivo.txt', 'utf-8')
    .then(text => {
        console.log(text)
    })

console.log("-> Hacer cosas mientras lee el archivo...")

console.log("Leyendo el segundo archivo...")
// de manera Asyncrono
readFilePromise('./archivo2.txt', 'utf-8')
    .then(secondText => {
        console.log(secondText)
    })
