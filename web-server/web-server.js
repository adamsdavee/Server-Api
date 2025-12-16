const http = require("http")
const fs = require("fs")
const path = require("path")

const PORT = 4000
const HOSTNAME = "localhost"

// let htmlFile;
const html404File = path.join(__dirname, "static", "404.html")

const getPage = function (req, res, filePath) {
   fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
         res.end("Did not read HTML file")
      }

      console.log("Html File read succesfully!")
      res.writeHead(200)
      res.write(data)

      res.end()
   })
}

const get404Page = function (req, res) {
   fs.readFile(html404File, "utf-8", (err, data) => {
      if (err) {
         res.writeHead(404)
         res.end("Did not read 404 file")

         return
      }

      console.log("404 File read succesfully!")
      res.writeHead(404)
      res.write(data)

      res.end()
   })
}

function requestHandler(req, res) {
   res.setHeader("Content-Type", "text/html")
   let filePath = path.join(__dirname, "static", req.url)
   // Had to do it this way as the client(browser) was requesting from multiple paths
   // like the external css file but ultimately it didn't work
   // I'll have to modify my html file so all the styles are there

   if (req.url == "/index.html") {
      getPage(req, res, filePath)
   } else {
      get404Page(req, res)
   }
}

const server = http.createServer(requestHandler)

server.listen(PORT, HOSTNAME, () => {
   console.log(`Server is listening on the ${HOSTNAME}:${PORT}`)
})

module.exports = server
