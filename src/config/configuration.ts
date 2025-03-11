export default () => ({
    PORT: process.env.port,
    dbUrl: process.env.dbUrl,
    SECRET_KEY: process.env.SECRET_KEY,
    THROTTLE_TTL: 3000,
    THROTTLE_LIMIT: 5
}
)