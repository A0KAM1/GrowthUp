import { Router } from "express"

const route = Router()
route.get('/', (req, res) => res.send('/acconts route'))

export default route