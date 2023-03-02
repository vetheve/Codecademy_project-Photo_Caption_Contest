module.exports = {
	secret: process.env.AUTH_SECRET || 'testsecret',
	expiresIn: process.env.AUTH_EXPIRESIN || '24h',
	rounds: process.env.AUTH_ROUNDS || 10
};