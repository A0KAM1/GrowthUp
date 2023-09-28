import { Router } from "express"
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
 *                      
 *      example:
 *          id: 1
 *          name: Lucas Andrigo Seixas
 *          email: lugas.seixas@email.com
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
 */

/**
 * @swagger
 * /users/{id}:
 *  put:
 *      description: Update a user
 *      summary: Update a user
 *      security:
 *          - bearerAuth: []
 *      tags:
 *      - Users
 *      parameters:
 *      - name: id
 *        in: path
 *        description: User id
 *        required: true
 *        schema:
 *          type: integer
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
 *                          $ref: '#/components/schemas/User'
 *          400:
 *              description: Invalid user data
 *          401:
 *              description: Unauthorized
 *          404:
 *              description: User not found
 */
route.put('/:id', authenticate, (req, res) => {
    const { id } = req.params
    const { name, email } = req.body

    // TODO: update user
    res.send({
        id,
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