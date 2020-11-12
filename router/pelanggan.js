const express = require("express")
const app = express()

const md5 = require("md5")
const pelanggan = require("../models/index").pelanggan

// request form body
app.use(express.urlencoded({extended:true}))

const verifytoken = require("./verifytoken")
app.use(verifytoken)

app.get("/",async(req,res) =>{
    pelanggan.findAll()
    .then(result =>{
        res.json(result)
    })
    .catch(error => {
        res.json({
            message:error.message
        })
    })
})

app.get("/:id_pelanggan",async(req,res)=>{
    let parameter={
        id_pelanggan:req.params.id_pelanggan
    }
    pelanggan.findOne({where: parameter})
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
        nomor_kwh:req.body.nomor_kwh,
        nama_pelanggan:req.body.nama_pelanggan,
        id_tarif:req.body.id_tarif
    }
    //eksekusi data
    pelanggan.create(data)
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
        nomor_kwh:req.body.nomor_kwh,
        nama_pelanggan:req.body.nama_pelanggan,
        id_tarif:req.body.id_tarif
    }
    //parameter untuk id yang akan di ubah
    let parameter={
        id_pelanggan: req.body.id_pelanggan
    }
    // execute update data
    pelanggan.update(data,{where : parameter})
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

app.delete("/:id_pelanggan",async(req,res)=>{
    let parameter={
        id_pelanggan:req.params.id_pelanggan
    }
    //eksekusi data
    pelanggan.destroy({where : parameter})
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