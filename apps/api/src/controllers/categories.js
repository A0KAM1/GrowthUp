import { Router } from "express"

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
 *              400:
 *                  description: Bad request
 *              401:
 *                  description: Unauthorized
 *              500:
 *                  description: Internal server error 
 */
route.get("/", (req, res) => {
    // TODO: implement get categories list

    res.json([
        {
            id: 1,
            title: "Salary",
            color: "#000000",
            createdAt: "2021-01-01T00:00:00.000Z",
            updatedAt: "2021-01-01T00:00:00.000Z"
        }
    ])
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
 *              400:
 *                  description: Bad request
 *              401:
 *                  description: Unauthorized
 *              404:
 *                  description: Category not found
 *              500:
 *                  description: Internal server error
 */
route.get("/:id", (req, res) => {
    // TODO: implement get category by id
    const { id } = req.params

    res.json({
        id,
        title: "Salary",
        color: "#000000",
        createdAt: "2021-01-01T00:00:00.000Z",
        updatedAt: "2021-01-01T00:00:00.000Z"
    })
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
 *              401:
 *                  description: Unauthorized
 *              500:
 *                  description: Internal server error
 */
route.post("/", (req, res) => {
    // TODO: implement create category
    const { title, color } = req.body

    res.json({
        id: 1,
        title,
        color,
        createdAt: "2021-01-01T00:00:00.000Z",
        updatedAt: "2021-01-01T00:00:00.000Z"
    })
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
 *              401:
 *                  description: Unauthorized
 *              404:
 *                  description: Category not found
 *              500:
 *                  description: Internal server error
 */
route.put("/:id", (req, res) => {
    // TODO: implement update category
    const { id } = req.params
    const { title, color } = req.body

    res.json({
        id,
        title,
        color,
        createdAt: "2021-01-01T00:00:00.000Z",
        updatedAt: "2021-01-01T00:00:00.000Z"
    })
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
 *              401:
 *                  description: Unauthorized
 *              404:
 *                  description: Category not found
 *              500:
 *                  description: Internal server error
 */
route.delete("/:id", (req, res) => {
    // TODO: implement delete category
    const { id } = req.params

    res.status(204).json()
})

export default route