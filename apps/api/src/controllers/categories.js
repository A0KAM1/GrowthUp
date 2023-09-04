import { Router } from "express"

const route = Router()
route.get('/', (req, res) => res.send('/categories route'))

export default route