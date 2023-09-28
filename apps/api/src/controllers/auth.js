import { Router } from "express"
import prisma from '../database.js'
import { comparePassword, hashPassword } from '../services/password.js'
import { generateToken } from '../services/jwt.js'

const route = Router()

/**
 * @swagger
 * components:
 *  securitySchemes:
 *      bearerAuth:
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT
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
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Error'
 *          404:
 *              description: User not found
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Error'
 *          500:
 *              description: Internal server error
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Error'
 */
route.post('/login', (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).send({
            message: 'Invalid data'
        })
    }

    prisma.user.findUnique({
        where: {
            email
        },
        select: {
            id: true,
            name: true,
            email: true,
            password: true,
            createdAt: true,
            updatedAt: true,
            account: {
                select: {
                    balance: true
                }
            },
            categories: {
                select: {
                    id: true,
                    title: true,
                    color: true,
                    createdAt: true,
                    updatedAt: true
                }
            }
        }
    }).then(user => {
        if (!user) {
            return res.status(404).send({
                message: 'User not found'
            })
        }

        comparePassword(password, user.password).then(match => {
            if (!match) {
                return res.status(401).send({
                    message: 'Invalid credentials'
                })
            }

            return res.status(200).send({
                ...user,
                token: generateToken(user.id)
            })
        })
    }).catch(error => {
        console.error(error)
        return res.status(500).send({
            message: 'Internal server error'
        })
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
 *                          password:
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
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Error'
 *          500:
 *              description: Internal server error
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Error'
 */
route.post('/register', async (req, res) => {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        return res.status(400).send({
            message: 'Invalid data'
        })
    }

    try {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (user) {
            return res.status(400).send({
                message: 'User already exists'
            })
        }

        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: await hashPassword(password),
                account: {
                    create: {
                        balance: 0
                    }
                }
            },
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
                updatedAt: true,
                account: {
                    select: {
                        balance: true
                    }
                },
                categories: {
                    select: {
                        id: true,
                        title: true,
                        color: true,
                        createdAt: true,
                        updatedAt: true
                    }
                }
            }
        })

        return res.status(201).send({
            ...newUser,
            token: generateToken(newUser.id)
        })
    } catch (error) {
        console.error(error)
        return res.status(500).send({
            message: 'Internal server error'
        })
    }
})

export default route