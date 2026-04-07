const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {
  fs.readFile('public/index.html', (err, data) => {
    if (err) {
      res.writeHead(404, {'Content-type': 'text/html'})
      return res.end('404 Not Found')
    }
    res.writeHead(200, {'Content-type': 'text/html'})
    res.write(data)
    return res.end()
  })
})
const PORT = 8000
server.listen(PORT, () => {
  console.log(`Server run at port ${PORT}`)
})