import { Router } from "express"

const route = Router()
route.get('/', (req, res) => res.send('/users route'))

export default route