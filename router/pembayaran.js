const express = require("express")
const app = express()

// library untuk upload file
// ---------------------------------
const multer = require("multer")
// multer digunakan untuk membaca data request dari form-data
const path = require("path")
// path untuk manage alamat direktori file
const fs = require("fs")
// fs untuk manage file

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./bukti")
    },
    filename: (req, file, cb) => {
        cb(null, "bukti-" + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage: storage})
// call model for buku
const pembayaran = require("../models/index").pembayaran
// middleware for allow the request from body
app.use(express.urlencoded({extended:true}))

const verifytoken = require("./verifytoken")
app.use(verifytoken)

app.get("/", async(req, res) => {
    pembayaran.findAll()
    .then(result => {
        res.json(result)
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

app.get("/:id_pembayaran", async(req, res) => {
    
    let params = {
        id_pembayaran: req.params.id_pembayaran
    }
    buku.findOne({where:params})
    .then(result => {
        res.json(result)
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

app.post("/", upload.single("bukti") ,async(req, res) => {
    // tampung data request yang akan di masukkan
    let data = {
        id_tagihan: req.body.id_tagihan,
        tanggal_pembayaran:new Date(),
        bulan_bayar: req.body.bulan_bayar,
        biaya_admin:req.body.biaya_admin,
        total_bayar:req.body.total_bayar,
        status: 0,
        bukti: req.file.filename,
        id_admin: req.body.id_admin
    }
    let idtagihan = {id_tagiham:data.id_tagihan}
    let status ={status:1}
    tagihan.update(status,{where:idtagihan})
    // execute insert data
    pembayaran.create(data)
    .then(result => {
        res.json({
            message: "Data has been inserted",
            data: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

app.put("/", upload.single("bukti"), async(req, res) => {
    // tampung data request yang akan di ubah
    let data = {
        id_tagihan: req.body.id_tagihan,
        tanggal_pembayaran:new Date(),
        bulan_bayar: req.body.bulan_bayar,
        biaya_admin:req.body.biaya_admin,
        total_bayar:req.body.total_bayar,
        status:0,
        id_admin: req.body.id_admin
    }
    // key yg menunjukkan data yg akan diubah
    let parameter = {
        id_pembayaran: req.body.id_pembayaran
    }

    if (req.file) {
        let oldPembayaran = await pembayaran.findOne({where: parameter})
        let oldBukti = oldPembayaran.bukti

        // delete old file
        let pathFile = path.join(__dirname,"../bukti",oldBukti)
        // __dirname = path direktori pada file saat ini
        fs.unlink(pathFile, error => console.log(error))
        // unlink = hapus file

        data.bukti = req.file.filename
    }

    let idtagihan = {id_tagiham:data.id_tagihan}
    let status ={status:1}
    tagihan.update(status,{where:idtagihan})
    // execute update data
    pembayaran.update(data,{where : parameter})
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

app.delete("/:id_pembayaran", async(req, res) => {
      // object
      let parameter = {
          id_pembayaran: req.params.id_pembayaran
      }

      // ambil data yg akan dihapus
      let oldPembayaran = await pembayaran.findOne({where: parameter})
      let oldBukti = oldPembayaran.bukti

      let pathFile = path.join(__dirname, "../bukti",oldBukti)
      fs.unlink(pathFile, err => console.log(err))

      // execute delete data
    pembayaran.destroy({where : parameter})
    .then(result => {
        res.json({
            message: "Data has been destroyed",
            data: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

module.exports = app