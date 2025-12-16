const fs = require("fs")
const path = require("path")

const dbPath = path.join(__dirname, "db", "items.json")

console.log(dbPath)

function createItem(req, res) {
   const body = []

   req.on("data", (chunk) => {
      body.push(chunk)
   })

   console.log(body)

   req.on("end", async () => {
      const stringBody = Buffer.concat(body).toString()
      const parsedBody = JSON.parse(stringBody)

      console.log(parsedBody)

      fs.readFile(dbPath, "utf-8", (err, data) => {
         console.log("I am here")
         if (err) {
            res.writeHead(400)
            res.end("Error in reading the file")
         }

         const oldData = JSON.parse(data)
         const updatedData = [...oldData, parsedBody]

         fs.writeFile(dbPath, JSON.stringify(updatedData), (err) => {
            if (err) {
               res.writeHead(400)
               res.end("Error in writing file")
            }

            console.log("File re-written successfully!")
            res.writeHead(200)
            res.end(JSON.stringify(updatedData))
         })
      })
   })
}

function getAllItems(req, res) {
   fs.readFile(dbPath, "utf-8", (err, data) => {
      if (err) {
         res.writeHead(400)
         res.end("Error in reading the file")
      }

      res.writeHead(200)
      res.end(data)
   })
}

module.exports = {
   createItem,
   getAllItems,
}
