import express from 'express'
import { PrismaClient } from '@prisma/client'


const db = new PrismaClient()

const PORT = 8080 || process.env.PORT

const app = express()

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