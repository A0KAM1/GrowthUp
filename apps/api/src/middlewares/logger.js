const cyan = "\x1b[36m"
const green = "\x1b[32m"
const magenta = "\x1b[35m"
const reset = "\x1b[0m"

const logger = (req, res, next) => {
    const { method, url } = req
    const date = new Date()

    res.on('finish', () => {
        const status = res.statusCode
        const userAgent = req.get('user-agent')
        const ip = req.ip
    
        let log = `[${date.toLocaleString()}]`
        log += ` ${cyan}${method}${reset}`
        log += ` ${green}${status}${reset}`
        log += ` ${magenta}${url}${reset}`
        log += ` ${userAgent}`
        log += ` ${ip}`

        console.info(log)
    })

    next()
}

export default logger