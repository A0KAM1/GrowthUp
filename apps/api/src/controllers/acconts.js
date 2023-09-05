import { Router } from 'express'

const route = Router()

/**
 * @swagger
 * /acconts:
 *   get:
 *     summary: Retrieve a list of JSONPlaceholder users
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
*/
route.get('/', (req, res) => res.send('/acconts route'))

export default route