const express = require('express')
// podemos crear UUIDS unicas
const crypto = require('node:crypto')
const movies = require('./movies.json')
const { validateMovie, validatePartialMovie } = require('./schema/movies')

// con esto inicializamos express
const app = express()
//deshabilitar el header X=Powered-By: Express
app.disable('x-powered-by')
// middleware para interpretar json
app.use(express.json())

const PORT = process.env.PORT ?? 1234

// Todos los recursos que sean MOVIES se identifican con '/movies'
app.get('/movies', (req, res) => {
    // aplicando query para filtar
    const { genre } = req.query
    if(genre){
        const filteredMovies = movies.filter(
            movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
        )
        res.json(filteredMovies)
    }

    res.json(movies)
})

// path-to-regexp -> consultar una movie por id
app.get('/movies/:id', (req, res) => {
    const { id } = req.params
    const movie = movies.find(movie => movie.id === id)
    if(movie) return res.json(movie)

    res.status(404).json({message: 'Not found'})
})

// crear una pelicula con validacion de datos (sanitizar)
app.post('/movies', (req, res) => {
    // aplicamos las validaciones del objeto recibido
    const result = validateMovie(req.body)
    if (result.error){
        // Puede ser 422 Unprocessable Content
        return res.status(400).json({error: JSON.parse(result.error.message)})
    }
    newMovie = {
        id: crypto.randomUUID(), // UUID v4
        ...result.data
    }
    // Esto no seria REST, porque estamos guardando
    // el estado de la aplicacion en memoria
    movies.push(newMovie)

    res.status(201).json(newMovie)
})

// actualizar una pelicula parcialmente
app.patch('/movies/:id', (req, res) => {
    // validamos de manera parcial el objeto
    const result = validatePartialMovie(req.body)
    if (!result.success){
        // Puede ser 422 Unprocessable Content
        return res.status(400).json({error: JSON.parse(result.error.message)})
    }

    const { id } = req.params
    const movieIndex = movies.findIndex(movie => movie.id === id)
    if(movieIndex === -1){
        res.status(404).json({message: 'Not found'})
    }

    const updateMovie = {
        ...movies[movieIndex],
        ...result.data
    }

    // Esto no seria REST, porque estamos guardando
    // el estado de la aplicacion en memoria
    movies[movieIndex] = updateMovie

    return res.json(updateMovie)
})

app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
})
