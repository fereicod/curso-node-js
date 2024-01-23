const fs = require('node:fs')

// Sync
console.log("Leyendo el primero archivo...")
// de manera syncrono
const text = fs.readFileSync('./archivo.txt', 'utf-8')
console.log(text)

console.log("-> Hacer cosas mientras lee el archivo...")

console.log("Leyendo el segundo archivo...")
// de manera syncrono
const secondText = fs.readFileSync('./archivo2.txt', 'utf-8')
console.log(secondText)
