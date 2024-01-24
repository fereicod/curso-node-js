// argumentos de entrada
console.log(process.argv)


//controla el proceso y su salida
// 0 - todo bien
// 1 - que salga pero que habido con error
process.exit(0)

// escuchar eventos del proceso
process.on('exit', () => {
    // limpiar los recursos
})

//current working directory obtenemos el path desde donde se ejecuta el proceso/archivo
console.log(process.cwd())

//platform obtenemos las variables de entorno
console.log(process.env.NODE_ENV)
