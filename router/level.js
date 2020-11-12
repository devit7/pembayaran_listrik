const express = require("express")
const app = express()


const level = require("../models/index").level

// request form body
app.use(express.urlencoded({extended:true}))

const verifytoken = require("./verifytoken")
app.use(verifytoken)

app.get("/",async(req,res) =>{
    level.findAll()
    .then(result =>{
        res.json(result)
    })
    .catch(error => {
        res.json({
            message:error.message
        })
    })
})

app.get("/:id_level",async(req,res)=>{
    let parameter={
        id_level:req.params.id_level
    }
    level.findOne({where: parameter})
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
        nama_level:req.body.nama_level
    }
    //eksekusi data
    level.create(data)
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
        nama_level:req.body.nama_level
    }
    //parameter untuk id yang akan di ubah
    let parameter={
        id_level: req.body.id_level
    }
    // execute update data
    level.update(data,{where : parameter})
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

app.delete("/:id_level",async(req,res)=>{
    let parameter={
        id_level:req.params.id_level
    }
    //eksekusi data
    level.destroy({where : parameter})
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