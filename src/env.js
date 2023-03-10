const config =
  process.env.NODE_ENV !== 'production' ? await import('dotenv') : null

if (config) config.config()

export const PORT = process.env.PORT || 5000
export const DATABASE_URI = process.env.DATABASE_URI || ''
export const SECRET_KEY = process.env.SECRET_KEY || ''
