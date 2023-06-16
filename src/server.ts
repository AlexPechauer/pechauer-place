import * as Express from 'express'
import { startup } from './endpoint'
import * as dotenv from "dotenv"

if (process.env.NODE_ENV == 'development') {
  dotenv.config({ path: process.env.PWD + '/.env' })
}

const app = Express();
startup(app);
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Fucking rip it`));