import { Router } from "express"
import prisma from '../database.js'
import authenticate from "../middlewares/authenticate.js"

const route = Router()

/**
 * @swagger
 * components:
 *  schemas:
 *      Category:
 *          type: object
 *          required:
 *              - title
 *              - color
 *          properties:
 *              id:
 *                  type: integer
 *                  description: The auto-generated id of the category
 *              title:
 *                  type: string
 *                  description: The category title
 *              color:
 *                  type: string
 *                  description: The category color
 *              createdAt:
 *                  type: string
 *                  format: date-time
 *                  description: The date of the creation of the category
 *              updatedAt:
 *                  type: string
 *                  format: date-time
 *                  description: The date of the last update of the category
 *          example:
 *              id: 1
 *              name: Salary
 *              color: #000000
 *              createdAt: 2021-01-01T00:00:00.000Z
 *              updatedAt: 2021-01-01T00:00:00.000Z
 */

/**
 * @swagger
 *  /categories:
 *      get:
 *          description: Get categories list
 *          summary: Get categories list
 *          tags:
 *              - Categories
 *          security:
 *              - bearerAuth: []
 *          responses:
 *              200:
 *                  description: Return categories list
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Category'
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
route.get("/", authenticate, async (req, res) => {
    try {
        const categories = await prisma.category.findMany({
            where: {
                userId: req.userId
            },
            select: {
                id: true,
                title: true,
                color: true,
                createdAt: true,
                updatedAt: true
            }
        })

        res.status(200).json(categories)
    } catch (error) {
        res.status(500).json(error)
    }
})

/**
 * @swagger
 *  /categories/{id}:
 *      get:
 *          description: Get a category by id
 *          summary: Get a category by id
 *          tags:
 *              - Categories
 *          security:
 *              - bearerAuth: []
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                  type: integer
 *                required: true
 *                description: The category id
 *          responses:
 *              200:
 *                  description: The category description by id
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Category'
 *              401:
 *                  description: Unauthorized
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Error'
 *              404:
 *                  description: Category not found
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
route.get("/:id", authenticate, async (req, res) => {
    const { id } = req.params

    try {
        const category = await prisma.category.findUnique({
            where: {
                id: parseInt(id)
            }
        })

        if (!category) {
            return res.status(404).json({
                message: "Category not found"
            })
        }

        if (category.userId !== req.userId) {
            return res.status(401).json({
                message: "Unauthorized"
            })
        }

        delete category.userId

        res.status(200).json(category)
    } catch (error) {
        res.status(500).json(error)
    }
})

/**
 * @swagger
 *  /categories:
 *      post:
 *          description: Create a new category
 *          summary: Create a new category
 *          tags:
 *              - Categories
 *          security:
 *              - bearerAuth: []
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          required:
 *                              - title
 *                              - color
 *                          properties:
 *                              title:
 *                                  type: string
 *                              color:
 *                                  type: string
 *          responses:
 *              201:
 *                  description: The created category
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Category'
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
route.post("/", authenticate, async (req, res) => {
    const { title, color } = req.body

    if (!title || !color) {
        return res.status(400).json({
            message: "Invalid data"
        })
    }

    try {
        const category = await prisma.category.create({
            data: {
                title,
                color,
                userId: req.userId
            },
            select: {
                id: true,
                title: true,
                color: true,
                createdAt: true,
                updatedAt: true
            }
        })

        res.status(201).json(category)
    } catch (error) {
        res.status(500).json(error)
    }
})

/**
 * @swagger
 *  /categories/{id}:
 *      put:
 *          description: Update a category
 *          summary: Update a category
 *          tags:
 *              - Categories
 *          security:
 *              - bearerAuth: []
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                  type: integer
 *                required: true
 *                description: The category id
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          required:
 *                              - title
 *                              - color
 *                          properties:
 *                              title:
 *                                  type: string
 *                              color:
 *                                  type: string
 *          responses:
 *              200:
 *                  description: The updated category
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Category'
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
 *              404:
 *                  description: Category not found
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
route.put("/:id", authenticate, async (req, res) => {
    const { id } = req.params
    const { title, color } = req.body

    if (!title || !color || !id) {
        return res.status(400).json({
            message: "Invalid data"
        })
    }

    try {
        const category = await prisma.category.findUnique({
            where: {
                id: parseInt(id)
            }
        })

        if (!category) {
            return res.status(404).json({
                message: "Category not found"
            })
        }

        if (category.userId !== req.userId) {
            return res.status(401).json({
                message: "Unauthorized"
            })
        }

        const updatedCategory = await prisma.category.update({
            where: {
                id: parseInt(id)
            },
            data: {
                title,
                color,
                updatedAt: new Date()
            },
            select: {
                id: true,
                title: true,
                color: true,
                createdAt: true,
                updatedAt: true
            }
        })

        res.status(200).json(updatedCategory)
    } catch (error) {
        res.status(500).json(error)
    }
})

/**
 * @swagger
 *  /categories/{id}:
 *      delete:
 *          description: Delete a category
 *          summary: Delete a category
 *          tags:
 *              - Categories
 *          security:
 *              - bearerAuth: []
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                  type: integer
 *                required: true
 *                description: The category id
 *          responses:
 *              204:
 *                  description: The category was deleted
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
 *              404:
 *                  description: Category not found
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
route.delete("/:id", authenticate, async (req, res) => {
    const { id } = req.params

    if (!id) {
        return res.status(400).json({
            message: "Invalid data"
        })
    }

    try {
        const category = await prisma.category.findUnique({
            where: {
                id: parseInt(id)
            }
        })

        if (!category) {
            return res.status(404).json({
                message: "Category not found"
            })
        }

        if (category.userId !== req.userId) {
            return res.status(401).json({
                message: "Unauthorized"
            })
        }

        await prisma.category.delete({
            where: {
                id: parseInt(id)
            }
        })

        res.status(204).json()
    } catch (error) {
        res.status(500).json(error)
    }
})

export default route