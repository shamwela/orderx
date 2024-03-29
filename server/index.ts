import { userRouter } from './user/router'
import { orderRouter } from './order/router'
import { productRouter } from './product/router'
import express from 'express'
import cors from 'cors'
import { clientUrl } from './utilities/clientUrl'
import { rateLimit } from 'express-rate-limit'
import xssClean from 'xss-clean'
import helmet from 'helmet'
import { register } from './controllers/register'
import { login } from './controllers/login'
import { logout } from './controllers/logout'
import { rejectUnauthenticatedRequests } from './middlewares/rejectUnauthenticatedRequests'

const app = express()
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

app.use(rejectUnauthenticatedRequests)
app.get('/logout', logout)
app.use('/product', productRouter)
app.use('/order', orderRouter)
app.use('/user', userRouter)

app.get('*', (request, response) =>
  response.status(404).json({ message: 'This route does not exist.' })
)

const port = process.env.PORT || 2000
app.listen(port, () => console.log(`Server is running on port ${port}.`))
