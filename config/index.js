module.exports = {
  environment: process.env.NODE_ENV || "development",
  port: process.env.PORT || 4000,
  db: {
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME || 'postgres',
  },
  jwtConfig: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  }
};
