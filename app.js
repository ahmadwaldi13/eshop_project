import express from 'express'
import routes from './routes/index.js'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import fileUpload from 'express-fileupload'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const PORT = 3000
const app = express()


app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))
app.use(fileUpload())
app.use('/images', express.static(__dirname + '/public/images'))
app.use('/api/v1', routes)

app.listen(PORT, () => console.info(`server listening on ${PORT}`))