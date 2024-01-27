const express = require('express')

// con esto inicializamos express
const app = express()

const PORT = process.env.PORT ?? 5002

// importante definimos el method y en que ruta realizara algo
app.get('/', (req, res) => {
    //res.send('<h1>Mi página con ExpressJS</h1>')
    res.json({mensaje: "Mi página con ExpressJS"})
})

app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
})
