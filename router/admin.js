const express = require("express")
const app = express()

const md5 = require("md5")
const admin = require("../models/index").admin

// request form body
app.use(express.urlencoded({extended:true}))

app.get("/",async(req,res) =>{
    admin.findAll()
    .then(result =>{
        res.json(result)
    })
    .catch(error => {
        res.json({
            message:error.message
        })
    })
})

app.get("/:id_admin",async(req,res)=>{
    let parameter={
        id_admin:req.params.id_admin
    }
    admin.findOne({where: parameter})
    .then(result=>{
        res.json(result)
    })
    .catch(error=>{
        res.json({
            message:error.message
        })
    })
})

app.post("/",async(req,res) =>{
    let data = {
       username:req.body.username,
       password:md5(req.body.password),
       nama_admin:req.body.nama_admin,
       id_level:req.body.id_level
    }
    //eksekusi data
    admin.create(data)
    .then(result=>{
        res.json({
            message:"data has been insert",
            data: result
        })
    })
    .catch(error =>{
        res.json({
            message: error.message
        })
    })
})

app.put("/",async(req,res)=>{
    let data={
        username:req.body.username,
       password:md5(req.body.password),
       nama_admin:req.body.nama_admin,
       id_level:req.body.id_level
    }
    //parameter untuk id yang akan di ubah
    let parameter={
        id_admin: req.body.id_admin
    }
    // execute update data
    admin.update(data,{where : parameter})
    .then(result => {
        res.json({
            message: "Data has been updated",
            data: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

app.delete("/:id_admin",async(req,res)=>{
    let parameter={
        id_admin:req.params.id_admin
    }
    //eksekusi data
    admin.destroy({where : parameter})
    .then(result=>{
        res.json({
            message:"data has been destroyed",
            data:result
        })
    })
    .catch(error =>{
        res.json({
            message:error.message
        })
    })
})
module.exports=app