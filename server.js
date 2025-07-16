import http from 'node:http'
import { getDataFromDB } from './Database/db.js'
import { sendJSONResponse } from './utils/sendJSONResponse.js'
import { sendDataFromPathParam } from './utils/sendDataFromPathParams.js'


const PORT = 8000

const server = http.createServer(async (req, res) => {
    const destinations = await getDataFromDB()

    if(req.url === '/api' && req.method === 'GET') {
        sendJSONResponse(res, 200, destinations)
    }  
    else if(req.url.startsWith('/api/continent') && req.method === 'GET') {
        const continent = req.url.split('/').pop()
        const filteredData = sendDataFromPathParam(destinations, 'continent', continent)
        sendJSONResponse(res, 200, filteredData)
    }

    else if(req.url.startsWith('/api/country') && req.method === 'GET') {
        const country = req.url.split('/').pop()
        const filteredData = sendDataFromPathParam(destinations, 'country', country)
        sendJSONResponse(res, 200, filteredData)
    }

    else {
        sendJSONResponse(res, 404,  {
            error: "not found",
            message: "The requested route does not exist"
            })
    }
})

server.listen(PORT, () => console.log(`connected on port: ${PORT}`)) 