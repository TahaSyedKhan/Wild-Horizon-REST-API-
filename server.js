import http from 'node:http'
import { getDataFromDB } from './Database/db.js'


const PORT = 8000

const server = http.createServer(async (req, res) => {
    const destinations = await getDataFromDB()

    if(req.url === '/api' && req.method === 'GET') {
        res.statusCode = 200
        res.setHeader("Content-Type", "application/json")
        res.end(JSON.stringify(destinations))
    }  
    else if(req.url.startsWith('/api/continent') && req.method === 'GET') {
        const continent = req.url.split('/').pop()
        const filteredData = destinations.filter(destination => 
            destination.continent.toLowerCase() === continent.toLocaleLowerCase()
        )
        res.statusCode = 200
        res.setHeader("Content-Type", "application/json")
        res.end(JSON.stringify(filteredData))
    }
    else {
        res.statusCode = 404
        res.setHeader("Content-Type", "application/json")
        res.end(JSON.stringify(
            {
            error: "not found",
            message: "The requested route does not exist"
            }
        ))
    }
})

server.listen(PORT, () => console.log(`connected on port: ${PORT}`))