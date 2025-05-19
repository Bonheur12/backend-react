import express from 'express'
import mysql from 'mysql2'
import cors from 'cors'

const app =express();
app.use(cors());
app.use(express.json())

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database: 'react-study'
})

app.get('/',(req,res)=>{
    const sql = "SELECT * FROM react";
    db.query(sql,(err,result)=>{
        if(err) return res.json({message:"Server failed"});
        return res.json(result);
    })

})

app.post('/create',(req,res)=>{
    const sql = "INSERT INTO react (`name`,`email`,`password`) VALUES (?)";
    console.log(req.body);
    
    const values =[
        req.body.name,
        req.body.email,
        req.body.password
    ]
    db.query(sql,[values],(err,result)=>{
        if(err) return res.json(err);
        return res.json(result);
    })

})

app.get('/read/:id',(req,res)=>{
    const sql = "SELECT * FROM react WHERE ID=?";
    const id = req.params.id;
    db.query(sql,[id],(err,result)=>{
        if(err) return res.json({message:"Server failed"});
        return res.json(result);
    })

})

app.put('/edit/:id',(req,res)=>{
    const sql ="UPDATE react SET name = ?, email = ?, password = ? WHERE ID = ?";
    const id = req.params.id;
    db.query(sql,[req.body.name, req.body.email, req.body.password, id],(err,result)=> {
        if(err) return res.json({message:"Server failed"});
        return res.json(result);
    })
})

app.delete('/delete/:id',(req,res)=>{
    const sql ="DELETE FROM react WHERE ID=?";
    const id = req.params.id;
    db.query(sql,[ id],(err,result)=> {
        if(err) return res.json({message:"Server failed"});
        return res.json(result);
    })
})

app.listen(5000,()=>{
    console.log("Listening");
    
})