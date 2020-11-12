const express = require("express")
const app = express()

//call model
const tarif = require("../models/index").tarif

//middleware
app.use(express.urlencoded({extended: true}))

const verifytoken = require("./verifytoken")
app.use(verifytoken)

app.get("/",async(req,res) =>{
    tarif.findAll()
    .then(result =>{
        res.json(result)
    })
    .catch(error => {
        res.json({
            message:error.message
        })
    })
})

app.get("/:id_tarif",async(req,res)=>{
    let parameter={
        id_tarif:req.params.id_tarif
    }
    tarif.findOne({where: parameter})
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
        daya: req.body.daya,
        tarifperkwh: req.body.tarifperkwh
    }
    //eksekusi data
    tarif.create(data)
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
        daya:req.body.daya,
        tarifperkwh:req.body.tarifperkwh
    }
    //parameter untuk id yang akan di ubah
    let parameter={
        id_tarif: req.body.id_tarif
    }
    // execute update data
    tarif.update(data,{where : parameter})
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

app.delete("/:id_tarif",async(req,res)=>{
    let parameter={
        id_tarif:req.params.id_tarif
    }
    //eksekusi data
    tarif.destroy({where : parameter})
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