const express = require("express")
const app = express()
const md5 = require("md5")
const jwt = require("jsonwebtoken")// npm install jsonwebtoken


// model petugas
const admin = require("../models/index").admin
const pelanggan = require("../models/index").pelanggan
app.use(express.urlencoded({extended: true}))

app.post("/login/admin", async (req, res) => {
    let parameter = {
        username: req.body.username,
        password: md5(req.body.password)
    }

    let result = await admin.findOne({where: parameter})
    if(result === null){
        // invalid username or password
        res.json({
            message: "Invalid Username or Password"
        })
    }else{
        // login success
        // generate token using jwt
        // jwt->header, payload, secretKey
        let jwtHeader = {
            algorithm: "HS256",
            expiresIn: "1h"
        }

        let payload = {data: result}
        let secretKey = "mbuh"

        let token = jwt.sign(payload, secretKey, jwtHeader)
        res.json({
            data: result,
            token: token
        })
    }
}) 
app.post("/login/user", async (req, res) => {
    let parameter = {
        username: req.body.username,
        password: md5(req.body.password)
    }

    let result = await pelanggan.findOne({where: parameter})
    if(result === null){
        // invalid username or password
        res.json({
            message: "Invalid Username or Password"
        })
    }else{
        // login success
        // generate token using jwt
        // jwt->header, payload, secretKey
        let jwtHeader = {
            algorithm: "HS256",
            expiresIn: "1h"
        }

        let payload = {data: result}
        let secretKey = "mbuh"

        let token = jwt.sign(payload, secretKey, jwtHeader)
        res.json({
            data: result,
            token: token
        })
    }
})

module.exports = app
