export const sendJSONResponse = (res, statusCode, payload) => {
    res.statusCode = statusCode
    res.setHeader("Content-Type", "application/json")
    res.end(JSON.stringify(payload))
}