import { createClient } from 'redis';
import { promisify } from 'util';

class RedisClient {
    constructor() {
        // Create a Redis client
        this.client = createClient();
        this.getAsync = promisify(this.client.get).bind(this.client);
        // Display any error of the redis client in the console
        this.client.on('error', (err) => {
            console.error(`Redis client not connected to the server: ${err.message}`);
        });
    }

    isAlive() {
        // Check if the connection to redis is successful
        return this.client.connected;
    }

    async get(key) {
        const res = await this.getAsync(key);
        return res;
    }

    async set(key, value, duration) {
        // set a value in Redis with an expiration time
        this.client.setex(key, duration, value);
    }

    async del(key) {
        // Remove the value associated with the given key from Redis
        this.client.del(key);
    }
}
// Create and export an instance of RedisClient
const redisClient = new RedisClient();
module.exports = redisClient;
