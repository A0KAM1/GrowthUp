import express from 'express'
import routes from './routes.js'

const app = express()
const port = process.env.PORT || 3000

app.use('/api', routes)

app.use('*', (req, res) => {
    res.sendStatus(404)
})

app.listen(port, () => {
    console.log(`🚀 server ready on http://localhost:${port}/`)
})