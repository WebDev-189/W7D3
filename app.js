/**
The first thing your server should do is reading the dotenv file and connect to the DB
 */
//require("dotenv").config({path: './secret/.env'})
require("dotenv").config()
/**
 * CONNECT TO DB
 */
require("./config/dbConnect")

const morgan = require("morgan")
const express = require("express")

const app = express()

/**
 * MIDDLEWARES
 */
app.use(morgan("dev"))
/**
 * express.json() read the request body and parse the potential json
 */
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (_, res) => res.send("Server running"))

app.use("/users", require("./routes/user.routes"))
app.use("/costumes", require("./routes/costume.routes"))

app.listen(process.env.PORT, () => console.log(`Server running`))
