export default () => ({
    PORT: process.env.port,
    dbUrl: process.env.dbUrl,
    SECRET_KEY: process.env.SECRET_KEY,
    JWT_DEFAULT_EXPIRES: process.env.JWT_DEFAULT_EXPIRES,
    THROTTLE_TTL: process.env.THROTTLE_TTL,
    THROTTLE_LIMIT: process.env.THROTTLE_LIMIT,
    REFRESH_SECRET_KEY: process.env.REFRESH_SECRET_KEY,
    REFRESH_EXPIRE_TIME: process.env.REFRESH_EXPIRE_TIME,
}
)