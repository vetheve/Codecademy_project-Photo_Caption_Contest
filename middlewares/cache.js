// This is a caching middleware that caches responses in memory for a specified duration
const mcache = require('memory-cache');

module.exports = function cache(duration) {
    // The 'duration' parameter is the cache duration in seconds

    // Return a middleware function that checks if the requested URL is already cached
    return (req, res, next) => {
        // Generate a cache key based on the request URL
        const key = '__cache__' + req.originalUrl || req.url;

        // Try to retrieve the cached response body from memory cache
        const cachedBody = mcache.get(key);

        // If the cached response body exists, send it to the client
        if (cachedBody) {
            res.send(cachedBody);
            return;
        } else {
            // If the cached response body does not exist, override the 'res.send' method
            res.sendResponse = res.send;
            res.send = (body) => {
                // Cache the response body in memory for the specified duration
                mcache.put(key, body, duration * 1000);

                // Send the response body to the client
                res.sendResponse(body);
            };

            // Proceed to the next middleware or route handler
            next();
        }
    };
};
