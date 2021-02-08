const express = require('express')
const config = require('config')
const path = require('path')

const app = express()

const PORT = config.get('port') || 5900
app.use(express.json({ extended: true }))

app.use('/', express.static(path.join(__dirname, 'client/dist')))

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client/dist', 'index.html'))
})

app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))

