const { redisClient } = require("../configs/redis");
4;
async function addToRedis(key, value, expiresIn = 60 * 60 * 24) {
  try {
    return await redisClient.set(key, value, "EX", expiresIn);
  } catch (error) {
    throw new Error(error);
  }
}
