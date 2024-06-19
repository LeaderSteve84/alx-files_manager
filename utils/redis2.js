// utils/redis.js

const redis = require('redis');

class RedisClient {
    constructor() {
        // Create a Redis client
        this.client = redis.createClient();

        // Display any errors in the console
        this.client.on('error', (err) => {
            console.error('Redis error:', err);
        });
    }

    async isAlive() {
        // Check if the connection to Redis is successful
        return new Promise((resolve) => {
            this.client.ping('alive', (err, reply) => {
                resolve(reply === 'alive');
            });
        });
    }

    async get(key) {
        // Retrieve the value stored in Redis for the given key
        return new Promise((resolve) => {
            this.client.get(key, (err, value) => {
                resolve(value);
            });
        });
    }

    async set(key, value, durationInSeconds) {
        // Store a value in Redis with an expiration time
        this.client.setex(key, durationInSeconds, value);
    }

    async del(key) {
        // Remove the value associated with the given key from Redis
        this.client.del(key);
    }
}

// Create and export an instance of RedisClient
const redisClient = new RedisClient();
export default redisClient;
