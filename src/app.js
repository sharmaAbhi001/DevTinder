const express = require('express')
const app = express()
const PORT = 3000;


app.use("/superb", async (req,res) => {
    res.json({hello:"hii"})
})

app.get("/hello", async (req,res) => {
    res.send("hello")
})
app.listen(PORT,()=> console.log(`server start port ${PORT}`)
)