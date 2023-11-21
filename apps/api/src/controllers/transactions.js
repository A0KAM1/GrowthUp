import { Router } from "express"
import prisma from '../database.js'
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
 *              updatedAt:
 *                  type: string
 *                  format: date-time
 *                  description: The date of the last update of the transaction
 *              category:
 *                  type: integer
 *                  description: The category id of the transaction
 *          example:
 *              id: 1
 *              title: Salary
 *              amount: 5000
 *              type: DEPOSIT
 *              createdAt: 2021-01-01T00:00:00.000Z
 *              updatedAt: 2021-01-01T00:00:00.000Z
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
 *             - in: query
 *               name: filter
 *               schema:
 *                  type: string
 *               description: The filter type (DEPOSIT or WITHDRAW)
 *             - in: query
 *               name: category
 *               schema:
 *                  type: integer
 *               description: The category id
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
route.get('/', authenticate, async (req, res) => {
    const { page, filter, category } = req.query

    if (page && isNaN(page)) {
        return res.status(400).json({ message: 'Invalid page number' })
    } else if (filter && !['DEPOSIT', 'WITHDRAW'].includes(filter.toUpperCase())) {
        return res.status(400).json({ message: 'Invalid filter only DEPOSIT or WITHDRAW' })
    } else if (category && isNaN(category) && category < 1) {
        return res.status(400).json({ message: 'Invalid category id' })
    }

    try {
        const transactions = await prisma.transaction.findMany({
            where: {
                account: {
                    userId: req.userId
                },
                category: {
                    id: category ? parseInt(category) : undefined
                },
                type: {
                    equals: filter ? filter.toUpperCase() : undefined
                }
            },
            select: {
                id: true,
                title: true,
                amount: true,
                type: true,
                createdAt: true,
                updatedAt: true,
                category: {
                    select: {
                        id: true
                    }
                }
            },
            take: 100,
            skip: page ? (parseInt(page) - 1) * 100 : 0
        })

        const data = transactions.map(transaction => ({
            ...transaction,
            amount: parseFloat(transaction.amount),
            category: transaction.category?.id || null
        }))

        console.log(data)

        res.json(data)
    } catch (error) {
        console.error(error)
        res.status(500).json()
    }
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
route.get('/:id', authenticate, async (req, res) => {
    const { id } = req.params

    if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid transaction id' })
    }

    try {
        const transaction = await prisma.transaction.findUnique({
            where: {
                id: parseInt(id)
            },
            select: {
                id: true,
                title: true,
                amount: true,
                type: true,
                createdAt: true,
                updatedAt: true,
                account: {
                    select: {
                        userId: true
                    }
                },
                category: {
                    select: {
                        id: true
                    }
                }
            }
        })

        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' })
        }

        if (transaction.account.userId !== req.userId) {
            return res.status(401).json({ message: 'Unauthorized' })
        }

        delete transaction.account

        res.json({
            ...transaction,
            amount: parseFloat(transaction.amount),
            category: transaction.category.id
        })
    } catch (error) {
        console.error(error)
        res.status(500).json()
    }
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
 *                              enum: [DEPOSIT, WITHDRAW]
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
route.post('/', authenticate, async (req, res) => {
    const { title, amount, type, category } = req.body

    if (!amount || !type) {
        return res.status(400).json({ message: 'Invalid transaction data' })
    }

    try {
        if (category !== undefined) {
            const categoryExists = await prisma.category.findUnique({
                where: {
                    id: parseInt(category)
                }
            })

            if (req.userId !== categoryExists.userId) {
                return res.status(401).json({ message: 'Unauthorized' })
            }
        }

        const balance = await prisma.account.findUnique({
            where: {
                userId: req.userId
            },
            select: {
                balance: true
            }
        })

        await prisma.account.update({
            where: {
                userId: req.userId
            },
            data: {
                balance: type === 'DEPOSIT'
                    ? parseFloat(balance.balance) + parseFloat(amount)
                    : parseFloat(balance.balance) - parseFloat(amount)
            }
        })

        const query = {
            data: {
                title: title || 'Sem título',
                amount,
                type,
                account: {
                    connect: {
                        userId: req.userId
                    }
                }
            },
            select: {
                id: true,
                title: true,
                amount: true,
                type: true,
                createdAt: true,
                updatedAt: true,
                category: {
                    select: {
                        id: true
                    }
                }
            }
        }

        if (category !== undefined) {
            query.data.category = {
                connect: {
                    id: parseInt(category)
                }
            }
        }

        const transaction = await prisma.transaction.create(query)

        res.status(201).json({
            ...transaction,
            amount: parseFloat(transaction.amount),
            category: transaction.category.id
        })
    } catch (error) {
        console.error(error)
        res.status(500).json()
    }
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

route.put('/:id', authenticate, async (req, res) => {
    const { id } = req.params
    const { title, amount, type, category } = req.body

    try {
        const transaction = await prisma.transaction.findUnique({
            where: {
                id: parseInt(id)
            },
            select: {
                id: true,
                title: true,
                amount: true,
                type: true,
                createdAt: true,
                updatedAt: true,
                account: {
                    select: {
                        userId: true
                    }
                },
                category: {
                    select: {
                        id: true
                    }
                }
            }
        })

        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' })
        }

        if (transaction.account.userId !== req.userId) {
            return res.status(401).json({ message: 'Unauthorized' })
        }

        const query = {
            where: {
                id: parseInt(id)
            },
            data: {
                title,
                amount,
                type
            },
            select: {
                id: true,
                title: true,
                amount: true,
                type: true,
                createdAt: true,
                updatedAt: true,
                category: {
                    select: {
                        id: true
                    }
                }
            }
        }

        if (category === null) {
            query.data.category = {
                disconnect: true
            }
        } else if (category !== undefined) {
            const categoryExists = await prisma.category.findUnique({
                where: {
                    id: parseInt(category)
                }
            })

            if (req.userId !== categoryExists.userId) {
                return res.status(401).json({ message: 'Unauthorized' })
            }

            query.data.category = {
                connect: {
                    id: parseInt(category)
                }
            }
        }

        const updatedTransaction = await prisma.transaction.update(query)

        const amountDifference = parseFloat(updatedTransaction.amount) - parseFloat(transaction.amount)

        const oldBalance = await prisma.account.findUnique({
            where: {
                userId: req.userId
            },
            select: {
                balance: true
            }
        })

        await prisma.account.update({
            where: {
                userId: req.userId
            },
            data: {
                balance: updatedTransaction.type === transaction.type ?
                    updatedTransaction.type === 'DEPOSIT' ?
                        parseFloat(oldBalance.balance) + amountDifference
                        : parseFloat(oldBalance.balance) - amountDifference
                    : updatedTransaction.type === 'DEPOSIT' ?
                        parseFloat(oldBalance.balance) + (parseFloat(updatedTransaction.amount) * 2)
                        : parseFloat(oldBalance.balance) - (parseFloat(updatedTransaction.amount) * 2)
            }
        })

        res.json({
            ...updatedTransaction,
            amount: parseFloat(updatedTransaction.amount),
            category: updatedTransaction.category.id
        })
    } catch (error) {
        console.error(error)
        res.status(500).json()
    }
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
route.delete('/:id', authenticate, async (req, res) => {
    const { id } = req.params

    if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid transaction id' })
    }

    try {
        const transaction = await prisma.transaction.findUnique({
            where: {
                id: parseInt(id)
            },
            select: {
                account: {
                    select: {
                        userId: true
                    }
                },
                type: true,
                amount: true,
            }
        })

        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' })
        }

        if (transaction.account.userId !== req.userId) {
            return res.status(401).json({ message: 'Unauthorized' })
        }

        const Updatebalance = await prisma.account.findUnique({
            where: {
                userId: req.userId
            },
            select: {
                balance: true
            }
        })

        await prisma.account.update({
            where: {
                userId: req.userId
            },
            data: {
                balance: transaction.type === 'DEPOSIT'
                    ? parseFloat(Updatebalance.balance) - parseFloat(transaction.amount)
                    : parseFloat(Updatebalance.balance) + parseFloat(transaction.amount)
            }
        })

        await prisma.transaction.delete({
            where: {
                id: parseInt(id)
            }
        })

        res.status(204).json()
    } catch (error) {
        console.error(error)
        res.status(500).json()
    }
})

export default route