import express from "express"
import dotenv from "dotenv"

dotenv.config()
const app = express()

const PORT = process.env.PORT || 5000

app.use(express.json())

app.get("/", (req, res) => {
    res.send("CI CD SERVER IS RUNNING !!!")
})

app.listen(PORT, () => {
    console.log("SERVER IS RUNNING AT ", PORT)
}) 