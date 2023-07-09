import * as cors from 'cors'

interface Credentials {
  user: string,
  host: string,
  database: string,
  password: string,
  port: number
  ssl?: { rejectUnauthorized: boolean }
}

export const loadDbConfig = (): Credentials => {
  const config: any = {
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT
  }

  Object.values(config).forEach((v) => {
    if (v == undefined) { console.log(`Missing database config.`) }
  })

  if (process.env.NODE_ENV != 'development') {
    config.ssl = { rejectUnauthorized: false }
  }

  return config
}

export const loadJwtConfig = (): { jwtSecret: string, jwtTimeout: number } => {
  const jwtSecret = process.env.JWTSECRET
  const jwtTimeout = process.env.JWT_TIMEOUT

  if (!jwtSecret || !jwtTimeout) { throw Error('Missing Jwt config.') }
  return { jwtSecret, jwtTimeout: +jwtTimeout }
}

export const loadConfiguredCors = () => {
  const options: cors.CorsOptions = {
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'Authorization',
      'X-Access-Token',
    ],
    credentials: true,
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    origin: '*',
    preflightContinue: false,
  }
  return cors(options)
}