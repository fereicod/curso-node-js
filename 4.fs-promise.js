const fs = require('node:fs/promises')

console.log("Leyendo el primero archivo...")
// de manera asyncrono, utilizando callback (err, arg) => {}
fs.readFile('./archivo.txt', 'utf-8')
	.then(text => {
		console.log(text)
	})

console.log("-> Hacer cosas mientras lee el archivo...")

console.log("Leyendo el segundo archivo...")
// de manera asyncrono
fs.readFile('./archivo2.txt', 'utf-8')
	.then(secondText => {
		console.log(secondText)
	})
