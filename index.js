require('dotenv').config()
var express = require("express")
var app = express()

var multer = require("multer")
var EasyYandexS3 = require("easy-yandex-s3")

const { ACCESS_KEY_ID, SECRET_ACCESS_KEY, BUCKET } = process.env
const PORT = process.env.PORT || 3002

var s3 = new EasyYandexS3({
  auth: {
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
  },
  Bucket: BUCKET,
  debug: false
})

app.use(multer().any())

app.get('/*', async (req, res) => {
  const list = await s3.GetList(req.originalUrl)
  res.send(list)
})

app.delete('/*', async (req, res) => {
  const list = await s3.Remove(req.originalUrl)
  res.send(list)
})

app.post('/*', async (req, res) => {
  const buffer = req.files[0].buffer
  const upload = await s3.Upload({ buffer }, req.originalUrl)
  res.send(upload)
})

app.listen(PORT, function (err) {
  if (err) console.log("S3 упал с ошибкой :(((")
  console.log("S3 запущен на порту ", PORT);
})
