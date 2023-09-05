const cors = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Header', '*')
    res.header('Access-Control-Allow-Methods', '*')
    next()
}

export default cors