const express = require("express")
const { getMsg, delMsg } = require("./message")
const router = express.Router()
router.get("/getChat", getMsg)
router.delete("/:id", delMsg)

module.exports = router

