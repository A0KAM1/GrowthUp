import { Router, json } from 'express'

import { AuthController, CategoriesController, TransactionsController, UsersControllers } from './controllers/index.js'

const routes = Router()

routes.use(json())

routes.use('/', AuthController)
routes.use('/categories', CategoriesController)
routes.use('/transactions', TransactionsController)
routes.use('/users', UsersControllers)

export default routes