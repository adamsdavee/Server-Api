const fs = require("fs")
const path = require("path")

const dbPath = path.join(__dirname, "db", "items.json")

// ADD ITEMS

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

// GET ALL ITEMS
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

// GET SPECFIC ITEMS BY ID

function getEachItem(req, res) {
   //    const getId = req.url.split("/")
   //    const id = Number(getId[2])

   // OR
   const id = Number(req.url.split("/")[2])

   console.log(id)

   fs.readFile(dbPath, "utf-8", (err, data) => {
      if (err) {
         res.writeHead(400)
         res.end("Error in reading the file")
      }

      const allData = JSON.parse(data)
      const item = allData.find((items) => items.id == id)

      if (!item) {
         res.writeHead(400)
         res.end("Item not found!")

         return
      }

      res.writeHead(200)
      res.end(JSON.stringify(item))
   })
}

// UPDATE SPECIFIC ITEM BY ID
function updateItem(req, res) {
   const body = []

   req.on("data", (chunk) => {
      body.push(chunk)
   })

   req.on("end", async () => {
      const stringBody = Buffer.concat(body).toString()
      const parsedBody = JSON.parse(stringBody)

      fs.readFile(dbPath, "utf-8", (err, data) => {
         if (err) {
            res.writeHead(400)
            res.end("Error in reading the file")
         }

         const oldData = JSON.parse(data)
         const index = oldData.findIndex((items) => items.id == parsedBody.id)

         if (index == -1) {
            res.writeHead(400)
            res.end("Item with the specified ID not found!")
            return
         }
         const updatedData = { ...oldData[index], ...parsedBody }
         oldData[index] = updatedData

         fs.writeFile(dbPath, JSON.stringify(oldData), (err) => {
            if (err) {
               res.writeHead(400)
               res.end("Error in updating file")
            }

            console.log("File updated successfully!")
            res.writeHead(200)
            res.end(JSON.stringify(oldData))
         })
      })
   })
}

// DELETE ITEM BY ID

function deleteItem(req, res) {
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
         if (err) {
            res.writeHead(400)
            res.end("Error in reading the file")
            return
         }

         const oldData = JSON.parse(data)

         if (oldData.length < parsedBody.id) {
            res.writeHead(400)
            res.end("Item not found")
            return
         }
         const updatedData = oldData.filter(
            (items) => items.id != parsedBody.id
         )

         fs.writeFile(dbPath, JSON.stringify(updatedData), (err) => {
            if (err) {
               res.writeHead(400)
               res.end("Error in writing file")
            }

            console.log("File Deleted successfully!")
            res.writeHead(200)
            res.end(JSON.stringify(updatedData))
         })
      })
   })
}
module.exports = {
   createItem,
   getAllItems,
   getEachItem,
   updateItem,
   deleteItem,
}
