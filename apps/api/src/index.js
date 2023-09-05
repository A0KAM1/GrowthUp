import express from 'express'
import swaggerJsdoc from 'swagger-jsdoc'

import routes from './routes.js'

const app = express()
const port = process.env.PORT || 3000

if (process.env.PRODUCTION) {
    const swaggerUi = await import('swagger-ui-express')
    const swaggerSpec = swaggerJsdoc({
        definition: {
            openapi: '3.0.0',
            info: {
                title: 'API ES3',
                version: '1.0.0',
                description: 'API'
            },
            servers: [
                {
                    url: `http://localhost:${port}`
                }
            ]
        },
        apis: ['./src/constrollers/*.js']
    })

    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
}

app.use('/api', routes)

app.use('*', (req, res) => {
    res.sendStatus(404)
})

app.listen(port, () => {
    console.log(`🚀 server ready on http://localhost:${port}/`)
})