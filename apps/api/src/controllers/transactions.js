import { Router } from "express"
import authenticate from "../middlewares/authenticate.js"

const route = Router()

/**
 * @swagger
 * components:
 *  schemas:
 *      Transaction:
 *          type: object
 *          required:
 *              - title
 *              - amount
 *              - type
 *          properties:
 *              id:
 *                  type: integer
 *                  description: The auto-generated id of the transaction
 *              title:
 *                  type: string
 *                  description: The transaction title
 *              amount:
 *                  type: number
 *                  description: The transaction amount
 *              type:
 *                  type: string
 *                  description: The transaction type (DEPOSIT or WITHDRAW)
 *              createdAt:
 *                  type: string
 *                  format: date-time
 *                  description: The date of the creation of the transaction
 *              category:
 *                  type: integer
 *                  description: The category id of the transaction
 *          example:
 *              id: 1
 *              title: Salary
 *              amount: 5000
 *              type: DEPOSIT
 *              createdAt: 2021-01-01T00:00:00.000Z
 *              category: 1
 */

/**
 * @swagger
 *  /transactions?&page={page}&filter={filter}&category={category}:
 *      get:
 *          description: |
 *             Get transactions a list of 100 transactions per page.
 * 
 *             `pages` are optional default is 1
 *
 *             `filter` are optional, default is all transactions (DEPOSIT and WITHDRAW)
 *
 *             `category` are optional, default is all categories (1,2,3,4,5 categories ids)
 * 
 *          summary: Get transactions list
 *          tags:
 *              - Transactions
 *          security:
 *              - bearerAuth: []
 *          parameters:
 *             - in: query
 *               name: page
 *               schema:
 *                  type: integer
 *               description: The page number
 *          responses:
 *              200:
 *                  description: The list of transactions
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Transaction'
 *              400:
 *                  description: Bad request
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Error'
 *              401:
 *                  description: Unauthorized
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Error'
 *              500:
 *                  description: Internal server error
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Error'
 */
route.get('/', authenticate, (req, res) => {
    // TODO: Implement pagination
    res.json([
        {
            id: 1,
            title: 'Salary',
            amount: 5000,
            type: 'DEPOSIT',
            createdAt: '2021-01-01T00:00:00.000Z',
            category: 1
        },
        {
            id: 2,
            title: 'Rent',
            amount: 1000,
            type: 'WITHDRAW',
            createdAt: '2021-01-01T00:00:00.000Z',
            category: 2
        }
    ])
})

/**
 * @swagger
 * /transactions/{id}:
 *  get:
 *      description: Get a transaction by id
 *      summary: Get a transaction by id
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - Transactions
 *      parameters:
 *          - name: id
 *            in: path
 *            description: Transaction id
 *            required: true
 *            schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: The transaction
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Transaction'
 *          400:
 *              description: Bad request
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
 *              description: Transaction not found
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
route.get('/:id', authenticate, (req, res) => {
    // TODO: Implement get transaction by id
    const { id } = req.params

    res.json({
        id,
        title: 'Salary',
        amount: 5000,
        type: 'DEPOSIT',
        createdAt: '2021-01-01T00:00:00.000Z',
        category: 1
    })
})

/**
 * @swagger
 * /transactions:
 *  post:
 *      description: Create a new transaction
 *      summary: Create a new transaction
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - Transactions
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          title:
 *                              type: string
 *                          amount:
 *                              type: number
 *                          type:
 *                              type: string
 *                          category:
 *                              type: integer
 *      responses:
 *          201:
 *              description: The transaction was created
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Transaction'
 *          400:
 *              description: Invalid transaction data
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
 *          500:
 *              description: Internal server error
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Error'
 */
route.post('/', authenticate, (req, res) => {
    // TODO: Implement create transaction
    const { title, amount, type, category } = req.body

    res.json({
        id: 1,
        title,
        amount,
        type,
        createdAt: new Date(),
        category
    })
})

/**
 * @swagger
 * /transactions/{id}:
 *  put:
 *      description: Update a transaction
 *      summary: Update a transaction
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - Transactions
 *      parameters:
 *          - name: id
 *            in: path
 *            description: Transaction id
 *            required: true
 *            schema:
 *              type: integer
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          title:
 *                              type: string
 *                          amount:
 *                              type: number
 *                          type:
 *                              type: string
 *                          category:
 *                              type: integer
 *      responses:
 *          200:
 *              description: The transaction was updated
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Transaction'
 *          400:
 *              description: Invalid transaction data
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
 *              description: Transaction not found
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

route.put('/:id', authenticate, (req, res) => {
    // TODO: Implement update transaction
    const { id } = req.params
    const { title, amount, type, category } = req.body

    res.json({
        id,
        title,
        amount,
        type,
        createdAt: new Date(),
        category
    })
})

/**
 * @swagger
 * /transactions/{id}:
 *  delete:
 *      description: Delete a transaction
 *      summary: Delete a transaction
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - Transactions
 *      parameters:
 *          - name: id
 *            in: path
 *            description: Transaction id
 *            required: true
 *            schema:
 *              type: integer
 *      responses:
 *          204:
 *              description: The transaction was deleted
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Transaction'
 *          401:
 *              description: Unauthorized
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Error'
 *          404:
 *              description: Transaction not found
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
route.delete('/:id', authenticate, (req, res) => {
    // TODO: Implement delete transaction
    const { id } = req.params

    res.status(204).json()
})

export default route