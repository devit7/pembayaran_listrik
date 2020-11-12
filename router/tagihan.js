const express = require("express")
const app = express()

// call model for rak
const tagihan = require("../models/index").tagihan

// middleware for allow the request from body
app.use(express.urlencoded({extended:true}))

const verifytoken = require("./verifytoken")
app.use(verifytoken)

app.get("/",async(req,res) =>{
    tagihan.findAll()
    .then(result =>{
        res.json(result)
    })
    .catch(error => {
        res.json({
            message:error.message
        })
    })
})

app.get("/:id_tagihan",async(req,res)=>{
    let parameter={
        id_tagihan: req.params.id_tagihan
    }
    tagihan.findOne({where: parameter})
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
        id_penggunaan: req.body.id_penggunaan,
        bulan: req.body.bulan,
        tahun: req.body.tahun,
        jumlah_meter: req.body.jumlah_meter,
        status: 0
    }
    //eksekusi data
    tagihan.create(data)
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
        id_penggunaan: req.body.id_penggunaan,
        bulan: req.body.bulan,
        tahun: req.body.tahun,
        jumlah_meter: req.body.jumlah_meter,
        status: 0

    }
    //parameter untuk id yang akan di ubah
    let parameter={
        id_tagihan: req.body.id_tagihan
    }
    // execute update data
    tagihan.update(data,{where : parameter})
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

app.delete("/:id_tagihan",async(req,res)=>{
    let parameter={
        id_tagihan:req.params.id_tagihan
    }
    //eksekusi data
    tagihan.destroy({where : parameter})
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