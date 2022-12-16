import express from 'express'
import cors from 'cors'
import { clientUrl } from './utilities/clientUrl'
import { rateLimit } from 'express-rate-limit'
import xssClean from 'xss-clean'
import helmet from 'helmet'
import { register } from './controllers/register'
import { login } from './controllers/login'
import { order } from './controllers/order'
import { readProducts } from './controllers/product/read'
import cookieParser from 'cookie-parser'
import { logout } from './controllers/logout'
import { rejectUnauthenticatedRequests } from './middlewares/rejectUnauthenticatedRequests'
import { createProduct } from './controllers/product/create'
import { adminOnly } from './middlewares/adminOnly'

const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
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

app.post('/register', register)
app.post('/login', login)
app.get('/logout', logout)
app.post('/order', rejectUnauthenticatedRequests, order)

// Product
app.post(
  '/product/create',
  rejectUnauthenticatedRequests,
  adminOnly,
  createProduct
)
// All product information is public
app.get('/product/read', readProducts)

app.use((request, response) =>
  response.status(404).json({ message: 'This route does not exist.' })
)

const port = process.env.PORT || 2000
app.listen(port, () => console.log(`Server is running on port ${port}.`))
