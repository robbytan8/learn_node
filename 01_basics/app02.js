const http = require('http');

const server = http.createServer((req, res) => {
  console.log(req.url)
  console.log(req.method)
  return res.end()
})
const PORT = 8000
server.listen(PORT, () => {
  console.log(`Server run at port ${PORT}`)
})