import express from "express"
import mongoose from "mongoose"
import listEndpoints from "express-list-endpoints"
import cors from "cors"
import blogRouter from "./services/blogs/index.js"

const server = express()
const port = process.env.PORT || 3001

// ****************** MIDDLEWARES *********************
server.use(cors())
server.use(express.json())

// ****************** ENDPOINTS  *********************
server.use("/blogs", blogRouter)

// ****************** ERROR HANDLERS *********************

////
mongoose.connect(process.env.MONGO_CONNECTION)

mongoose.connection.on("connected", () => {
  console.log("Connected to Mongo")

  server.listen(port, () => {
    console.table(listEndpoints(server))
    console.log(`Server is running on port ${port}`)
  })
})
