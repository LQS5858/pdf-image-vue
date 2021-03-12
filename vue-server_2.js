const fs = require('fs')
const express = require('express')
const app = express()
const cors = require('cors')
const port = 8000

// 设置跨域
app.use(cors())
app.use(express.static('dist'))

app.get('*', (req, res) => {
    fs.readFile('./vue-static/index.html', 'utf-8', (err, html) => {
        res.send(html)
    })
})

app.listen(port, () => {
    console.log(`vue app listening at http://localhost:${port}`)
})