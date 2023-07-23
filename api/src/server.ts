import * as Express from 'express'
import { startup } from './endpoint'
import * as dotenv from "dotenv"

if (process.env.NODE_ENV == 'development') {
  dotenv.config({ path: process.env.PWD + '/.env' })
}

const app = Express();
startup(app);
app.listen(process.env.PORT, () => console.log(`Fucking rip it`));