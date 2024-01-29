const express = require('express')
const movies = require('./movies.json')

// con esto inicializamos express
const app = express()
//deshabilitar el header X=Powered-By: Express
app.disable('x-powered-by')
// middleware para interpretar json
app.use(express.json())

const PORT = process.env.PORT ?? 1234

// Creamos una lista de origins permitidos
const ACCEPTED_ORIGINS = [
    'http://localhost:1234',
    'http://localhost:8080',
    'http://movies.com',
]

// Todos los recursos que sean MOVIES se identifican con '/movies'
app.get('/movies', (req, res) => {
     // Solo lo recibimos si el proviene de otro dominio
    const origin = req.header('origin')
    // validamos si esta en los permitidos o si no lo obtenemos (asumiendo que es el mismo dominio)
    if(ACCEPTED_ORIGINS.includes(origin) || !origin){
        res.header('Access-Control-Allow-Origin', origin)
    }
    const { genre } = req.query
    if(genre){
        const filteredMovies = movies.filter(
            movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
        )
        res.json(filteredMovies)
    }

    res.json(movies)
})

// Borramos el objeto en especifico
app.delete('/movies/:id', (req, res) => {
    const origin = req.header('origin')
    if(ACCEPTED_ORIGINS.includes(origin) || !origin){
        res.header('Access-Control-Allow-Origin', origin)
    }

    const { id } = req.params
    const movieIndex = movies.findIndex(movie => movie.id === id)

    if (movieIndex === -1) {
        return res.status(404).json({ message: 'Movie not found' })
    }

    movies.splice(movieIndex, 1)

    return res.json({ message: 'Movie deleted' })
})

// indicamos que Methods tienen acceso mas estrictos
app.options('/movies/:id', (req, res) => {
    const origin = req.header('origin')
    if(ACCEPTED_ORIGINS.includes(origin) || !origin){
        res.header('Access-Control-Allow-Origin', origin)
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
    }
    res.send(200)
})

app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
})
