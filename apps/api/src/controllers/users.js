import { Router } from "express"
import prisma from '../database.js'
import authenticate from "../middlewares/authenticate.js"

const route = Router()

/**
 * @swagger
 * components:
 *  schemas:
 *     User:
 *      type: object
 *      properties:
 *          id:
 *              type: integer
 *              description: The auto-generated id of the user
 *          name:
 *              type: string
 *              description: The user name
 *          email:
 *              type: string
 *              description: The user email
 *          token:
 *              type: string
 *              description: The user token for authenticated requests
 *          createdAt:
 *              type: string
 *              format: date-time
 *              description: The date of the creation of the user
 *          updatedAt:
 *              type: date
 *              format: date-time
 *              description: The date of the last update of the user
 *          accont:
 *              type: object
 *              properties:
 *                  balance:
 *                      type: number
 *                      format: double
 *                      description: The user account balance
 *          categories:
 *              type: array
 *              items:
 *                  $ref: '#/components/schemas/Category'  
 *      example:
 *          id: 1
 *          name: Lucas Andrigo Seixas
 *          email: lucas.seixas@email.com
 *          token: token
 *          createdAt: 2021-01-01T00:00:00.000Z
 *          updatedAt: 2021-01-01T00:00:00.000Z
 *          accont:
 *              balance: 1000
 *          categories:
 *              - id: 1
 *                title: Food
 *                color: #000000
 *                createdAt: 2021-01-01T00:00:00.000Z
 *                updatedAt: 2021-01-01T00:00:00.000Z
 *              - id: 2
 *                title: Salary
 *                color: #000000
 *                createdAt: 2021-01-01T00:00:00.000Z
 *                updatedAt: 2021-01-01T00:00:00.000Z
 * 
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    UserUpdate:
 *      type: object
 *      properties:
 *          id:
 *              type: integer
 *              description: The auto-generated id of the user
 *          name:
 *              type: string
 *              description: The user name
 *          email:
 *              type: string
 *              description: The user email
 *          createdAt:
 *              type: string
 *              format: date-time
 *              description: The date of the creation of the user
 *          updatedAt:
 *              type: date
 *              format: date-time
 *              description: The date of the last update of the user
 *      example:
 *          id: 1
 *          name: Lucas Andrigo Seixas
 *          email: lucas.seixas@gmail.com
 *          createdAt: 2021-01-01T00:00:00.000Z
 *          updatedAt: 2021-01-01T00:00:00.000Z
 */

/**
 * @swagger
 * /users/me:
 *  get:
 *      description: Get a user by id
 *      summary: Get a user by id
 *      security:
 *          - bearerAuth: []
 *      tags:
 *      - Users
 *      responses:
 *          200:
 *              description: The user was found
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *          401:
 *              description: Unauthorized
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
 */
route.get('/me', authenticate, async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: req.userId
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

        if (!user) {
            return res.status(404).send({
                message: 'User not found'
            })
        }

        res.send(user)
    } catch (error) {
        console.error(error)
        res.status(500).json()
    }
})

/**
 * @swagger
 * /users/me:
 *  put:
 *      description: Update a user
 *      summary: Update a user
 *      security:
 *          - bearerAuth: []
 *      tags:
 *      - Users
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
 *          200:
 *              description: The user was updated
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/UserUpdate'
 *          400:
 *              description: Invalid user data
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Error'
 *          401:
 *              description: Unauthorized
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
 */
route.put('/:id', authenticate, async (req, res) => {
    const { name, email } = req.body

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: req.userId
            }
        })

        if (!user) {
            return res.status(404).send({
                message: 'User not found'
            })
        }

        const updatedUser = await prisma.user.update({
            where: {
                id: req.userId
            },
            data: {
                name,
                email
            }
        })

        res.send(updatedUser)
    } catch (error) {
        console.error(error)
        res.status(500).json()
    }
})

export default route