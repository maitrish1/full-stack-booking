import express from 'express'
import mysql from 'mysql2'
import cors from 'cors'


const app =express()

const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Babadook@gublu11",
    database:"users"
})

app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.json("Hello World")
})

app.get("/users",(req,res)=>{
    const q="SELECT * FROM user"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post("/users",(req,res)=>{
    const q ="INSERT INTO user (`username`,`ph`,`email`) VALUES (?)";
    const values=[
        req.body.username,
        req.body.ph,
        req.body.email,
    ]
    db.query(q,[values],(err,data)=>{
        if(err) return res.json(err)
        return res.json("User has been added.")
    })

})

app.delete("/users/:id", (req,res)=>{
    const userId=req.params.id;
    const q="DELETE FROM user WHERE id=?"

    db.query(q,[userId],(err,data)=>{
        if(err) return res.json(err)
        return res.json("user has been deleted.")
    })
})

app.put("/users/:id", (req,res)=>{
    const userId=req.params.id;
    const q="UPDATE user SET `username`=?,`ph`=?,`email`=? WHERE id=?"
    const values=[
        req.body.username,
        req.body.ph,
        req.body.email,
    ]
    db.query(q,[...values, userId],(err,data)=>{
        if(err) return res.json(err)
        return res.json("User has been updated.")
    })
})

app.listen(8800,()=>{
    console.log("Connected to backend.")
})