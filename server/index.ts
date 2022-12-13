import express from 'express'
import cors from 'cors'
import { clientUrl } from './utilities/clientUrl'
import { rateLimit } from 'express-rate-limit'
import xssClean from 'xss-clean'
import helmet from 'helmet'
import { register } from './controllers/register'
import { login } from './controllers/login'
import { order } from './controllers/order'
import { getAllProducts } from './controllers/products'
import cookieParser from 'cookie-parser'

const app = express()
app.use(
  cors({
    origin: clientUrl,
    credentials: true,
  })
)
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  })
)
app.use(xssClean())
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.post('/login', login)
app.post('/order', order)
app.get('/products', getAllProducts)
app.post('/register', register)
app.use((request, response) =>
  response.status(404).json({ message: 'Page not found.' })
)

const port = process.env.PORT || 2000
app.listen(port, () => console.log(`Server is running on port ${port}.`))
