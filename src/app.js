const express = require('express')
const app = express()
const PORT = 3000;


app.use("/superb", async (req,res) => {
    res.json({hello:"hii"})
})

app.get("/marvel", async (req,res) => {
    res.send("hello")
});
app.post("/marvel", async (req,res) => {
    // data saving 
    res.send("New Super hero Added successfully !")
});
app.patch("/marvel",async (req , res) => {
    // patching the data 
    res.send("Iron man repair successfully!")
});
app.delete("/marvel/:name",async (req,res) => {
    // deleting a super hero 
    const hero = req.params;
    res.send(` ${hero.name} deleted from marvel`)
});

app.listen(PORT,()=> console.log(`server start port ${PORT}`)
)