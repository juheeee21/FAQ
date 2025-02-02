/* eslint-disable no-undef */
require("dotenv").config();

const { createClient } = require("redis");
const redisClient = createClient({
  username: "default",
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: "redis-19105.c301.ap-south-1-1.ec2.redns.redis-cloud.com",
    port: 19105,
  },
});
redisClient.on("error", (err) => console.log("Redis Client Error", err));

const cacheMiddleware = async (req, res, next) => {
  const cachedData = await redisClient.get(req.originalUrl);
  if (cachedData) {
    return res.json(JSON.parse(cachedData));
  }
  next();
};

module.exports = { cacheMiddleware, redisClient };