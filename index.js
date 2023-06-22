import express from 'express'
import { PrismaClient } from '@prisma/client'
import { config} from 'dotenv'

config()

const db = new PrismaClient()

const PORT = process.env.PORT

const app = express()

app.use(express.static('public'))

app.use(express.json())

app.get("/api/products", async (req, res) => {
  try {
    const products = await db.products.findMany()
    res.status(200).json({
      products,
    })
  } catch (error) {
    console.log(error)
    res.status(400).json({
      message: 'Error al cargar los productos'
    })
  }
})


app.listen(PORT, () => {
  console.log(`App running on PORT ${PORT}`)
})