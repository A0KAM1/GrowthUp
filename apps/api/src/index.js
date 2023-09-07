import express from 'express'

import logger from './middlewares/logger.js'
import cors from './middlewares/cors.js'
import routes from './routes.js'
import isTrueSet from './utils/isTrueSet.js'

const app = express()
const port = process.env.PORT || 3000

app.use(logger)
app.use(cors)

if (!isTrueSet(process.env.PRODUCTION)) {
    const swaggerUi = await import('swagger-ui-express')
    const swaggerJsdoc = await import('swagger-jsdoc')

    const swaggerSpec = swaggerJsdoc.default({
        definition: {
            openapi: '3.1.0',
            info: {
                title: 'API ES3',
                version: '1.0.0',
                description: 'API'
            },
            servers: [
                {
                    description: 'Local server',
                    url: `http://localhost:${port}/api`
                }
            ]
        },
        apis: [
            './src/controllers/*.js',
            './src/routes.js'
        ]
    })

    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
}

app.use('/api', routes)

app.use('*', (req, res, next) => {
    res.sendStatus(404)
    next()
})

app.listen(port, () => {
    console.log(`🚀 server ready on http://localhost:${port}/`)
})