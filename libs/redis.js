const { redisClient } = require("../configs/redis");
4;
async function addToRedis(key, value, expiresIn = 60 * 60 * 24) {
  try {
    return await redisClient.set(key, value, "EX", expiresIn);
  } catch (error) {
    throw new Error(error);
  }
}

async function addRedisForCaching(key, value, expiresIn = 360) {
  try {
    return await redisClient.retex(key, expiresIn, value);
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {
  addToRedis,
  addRedisForCaching,
};
