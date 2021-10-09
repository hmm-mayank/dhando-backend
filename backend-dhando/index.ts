import express from 'express'
import  cors from 'cors'
import * as bodyParser from 'body-parser'
import { userRouter } from './routers/users.router'
import { tokenGuard } from './middlewares/token-guard'
import {productRouter} from "./routers/product.router";
import morganMiddleware from "./config/morganMiddileWare";
import {vendorRouter} from "./routers/vendor.router";

const app = express()
const port = 4001

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(morganMiddleware)
app.use('/', userRouter)
app.use('/product', productRouter)
app.use('/vendor', vendorRouter)


// Unprotected Get
app.get('/some-resource', (req, res, next) => {
    res.json('Hello World')
})
app.use(tokenGuard())

// Protected Get
app.get('/some-protected-resource', (req, res, next) => {
    res.json('Protected Hello World')
})

app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
})