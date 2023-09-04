import { Router } from "express"

const route = Router()
route.get('/', (req, res) => res.send('/transactions route'))

export default route