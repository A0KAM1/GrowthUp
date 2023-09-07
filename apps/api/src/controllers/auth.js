import { Router } from "express"

const route = Router()

/**
 * @swagger
 * components:
 *  securitySchemes:
 *      bearerAuth:
 *          type: http
 *          scheme: bearer
 */

/**
 * @swagger
 * /login:
 *  post:
 *      description: Login to the application
 *      summary: Login to the application
 *      tags:
 *          - Auth
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                          password:
 *                              type: string
 *      responses:
 *          200:
 *              description: The user was logged in
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *          401:
 *              description: Invalid credentials
 *          404:
 *              description: User not found
 *          500:
 *              description: Internal server error
 */
route.post('/login', (req, res) => {
    // TODO: Implement login
    res.send({
        id: 1,
        name: 'John Doe',
        email: 'john doe@email.com',
        token: 'token',
        createdAt: new Date(),
        updatedAt: new Date(),
        accont: {
            balance: 1000
        }
    })
})

/**
 * @swagger
 * /register:
 *  post:
 *      description: Register a new user
 *      security: []
 *      summary: Create a new user
 *      tags:
 *      - Auth
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                          email:
 *                              type: string
 *      responses:
 *          201:
 *              description: The user was created
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *          400:
 *              description: Invalid new user data
 *          500:
 *              description: Internal server error
 */
route.post('/register', (req, res) => {
    const { name, email } = req.body

    // TODO: create user
    res.send({
        id: 1,
        name,
        email,
        token: 'token',
        createdAt: new Date(),
        updatedAt: new Date(),
        accont: {
            balance: 1000
        }
    })
})


export default route