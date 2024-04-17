export const EnvConfiguration = () => ({
    enviroment: process.env.NODE_ENV || 'dev',
    mongodb: process.env.URI_MONGODB,
    port: process.env.PORT || 3000,
    default_limit: Number(process.env.DEFAULT_LIMIT) || 7
});