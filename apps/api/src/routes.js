import { Router } from 'express'

import { AccontsController, CategoriesController, TransactionsController, UsersControllers } from './controllers/index.js'

const routes = Router()

routes.use('/acconts', AccontsController)
routes.use('/categories', CategoriesController)
routes.use('/transactions', TransactionsController)
routes.use('/users', UsersControllers)

export default routes