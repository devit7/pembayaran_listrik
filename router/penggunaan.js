const express = require("express")
const app = express()


const penggunaan = require("../models/index").penggunaan

// request form body
app.use(express.urlencoded({extended:true}))

const verifytoken = require("./verifytoken")
app.use(verifytoken)

app.get("/",async(req,res) =>{
    penggunaan.findAll()
    .then(result =>{
        res.json(result)
    })
    .catch(error => {
        res.json({
            message:error.message
        })
    })
})

app.get("/:id_penggunaan",async(req,res)=>{
    let parameter={
        id_penggunaan:req.params.id_penggunaan
    }
    penggunaan.findOne({where: parameter})
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
        id_pelanggan: req.body.id_pelanggan,
        bulan: req.body.bulan,
        tahun: req.body.tahun,
        meter_awal: req.body.meter_awal,
        meter_akhir: req.body.meter_akhir
    }
    //eksekusi data
    penggunaan.create(data)
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
        id_pelanggan: req.body.id_pelanggan,
        bulan: req.body.bulan,
        tahun: req.body.tahun,
        meter_awal: req.body.meter_awal,
        meter_akhir: req.body.meter_akhir
    }
    //parameter untuk id yang akan di ubah
    let parameter={
        id_penggunaan: req.body.id_penggunaan
    }
    // execute update data
    penggunaan.update(data,{where : parameter})
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

app.delete("/:id_penggunaan",async(req,res)=>{
    let parameter={
        id_penggunaan:req.params.id_penggunaan
    }
    //eksekusi data
    penggunaan.destroy({where : parameter})
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