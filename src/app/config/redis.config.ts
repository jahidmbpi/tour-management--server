import { createClient } from "redis";
import { envVars } from "./env";
export const redisClient = createClient({
  username: envVars.RADIS.RADIS_USER_NAME,
  password: envVars.RADIS.RADIS_PASSWORD,
  socket: {
    host: envVars.RADIS.RADIS_HOST,
    port: Number(envVars.RADIS.RADIS_PORT),
  },
});

redisClient.on("error", (err) => console.log("Redis Client Error", err));

// await client.set("foo", "bar");
// const result = await client.get("foo");
// console.log(result); // >>> bar

export const connectRadis = async () => {
  if (!redisClient.isOpen) {
    await redisClient.connect();
    console.log("redis connected success");
  }
};
