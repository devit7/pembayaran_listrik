const express = require("express")
const app = express()


const pembayaran = require("../models/index").pembayaran

// request form body
app.use(express.urlencoded({extended:true}))

const verifytoken = require("./verifytoken")
app.use(verifytoken)

app.post("/:id_pembayaran",async(req,res)=>{
    let parameter={
        id_pembayaran:req.params.id_pembayaran
    }      
    let status={status:1}
//eksekusi data
    pembayaran.update(status,{where:parameter})
    .then(result => {
        res.json({
            message: "status pembayaran sudah terbayar",
            data: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})
module.exports=app