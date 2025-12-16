const http = require("http")
const fs = require("fs")
const path = require("path")

const dbPath = path.join(__dirname, "db", "items.json")

const {
   createItem,
   getAllItems,
   getEachItem,
   updateItem,
   deleteItem,
} = require("./request")

const PORT = 8000
const HOSTNAME = "localhost"

function requestHandler(req, res) {
   res.setHeader("Content-Type", "text/html")

   if (req.method == "POST" && req.url == "/items") {
      createItem(req, res)
   } else if (req.method == "GET" && req.url == "/items") {
      getAllItems(req, res)
   } else if (req.method == "GET" && req.url.startsWith("/items/")) {
      getEachItem(req, res)
   } else if (req.method == "PUT" && req.url == "/items") {
      updateItem(req, res)
   } else if (req.method == "DELETE" && req.url == "/items") {
      deleteItem(req, res)
   } else {
      res.writeHead(400)
      res.end(
         JSON.stringify({
            message: "Route not found",
         })
      )
   }
}

const server = http.createServer(requestHandler)

server.listen(PORT, HOSTNAME, () => {
   console.log(`Server is listening on the ${HOSTNAME}:${PORT}`)
})

module.exports = server
